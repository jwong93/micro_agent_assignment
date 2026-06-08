package com.jiakuang.assignment.service.impl;

import tools.jackson.databind.ObjectMapper;
import com.jiakuang.assignment.dto.ToolExecutionDTO;
import com.jiakuang.assignment.dto.WorkflowRunLogDTO;
import com.jiakuang.assignment.dto.WorkflowRunResponseDTO;
import com.jiakuang.assignment.entity.Workflow;
import com.jiakuang.assignment.entity.WorkflowNode;
import com.jiakuang.assignment.exception.WorkflowNotFoundException;
import com.jiakuang.assignment.model.InputNodeModel;
import com.jiakuang.assignment.model.PromptNodeModel;
import com.jiakuang.assignment.model.ToolNodeModel;
import com.jiakuang.assignment.repository.WorkflowRepository;

import com.jiakuang.assignment.service.PromptExecutionService;
import com.jiakuang.assignment.service.ToolNodeService;
import com.jiakuang.assignment.service.WorkflowRunnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class WorkflowRunnerServiceImpl implements WorkflowRunnerService {

    private final WorkflowRepository workflowRepository;
    private final ToolNodeService toolNodeService;
    private final PromptExecutionService promptExecutionService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public WorkflowRunResponseDTO runWorkflow(Long workflowId) {
        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new WorkflowNotFoundException(workflowId));

        Map<String, Object> context = new HashMap<>();
        List<WorkflowRunLogDTO> logs = new ArrayList<>();
        AtomicReference<Object> finalOutput = new AtomicReference<>();

        List<WorkflowNode> nodes = workflow.getNodes()
                .stream()
                .sorted(Comparator.comparing(WorkflowNode::getPosition))
                .toList();

        for (WorkflowNode node : nodes) {
            Object output = executeNode(node, context);
            finalOutput.set(output);

            logs.add(new WorkflowRunLogDTO(
                    node.getId(),
                    node.getName(),
                    node.getNodeType().name(),
                    "SUCCESS",
                    output
            ));
        }

        return WorkflowRunResponseDTO.builder()
                .workflowId(workflow.getId())
                .status("SUCCESS")
                .logs(logs)
                .context(context)
                .finalOutput(finalOutput)
                .build();
    }

    private Object executeNode(WorkflowNode node, Map<String, Object> context) {
        return switch (node.getNodeType()) {
            case INPUT -> executeInputNode(node, context);
            case TOOL -> executeToolNode(node, context);
            case PROMPT -> executePromptNode(node, context);
        };
    }

    private Object executeInputNode(WorkflowNode node, Map<String, Object> context) {
        InputNodeModel config = readConfig(node.getConfigJson(), InputNodeModel.class);

        context.put(config.variableName(), config.value());

        return Map.of("variableName", config.variableName(), "value", config.value());
    }

    private Object executeToolNode(WorkflowNode node, Map<String, Object> context) {
        ToolNodeModel config = readConfig(node.getConfigJson(), ToolNodeModel.class);

        Map<String, Object> resolvedInput = resolveInputMapping(config.inputMapping(), context);

        ToolExecutionDTO response = toolNodeService.executeTool(config.toolCode(), resolvedInput);

        context.put(config.outputVariable(), response.output());

        return response.output();
    }

    private Object executePromptNode(WorkflowNode node, Map<String, Object> context) {
        PromptNodeModel config = readConfig(node.getConfigJson(), PromptNodeModel.class);

        String output = promptExecutionService.executePrompt(config.prompt(), context);

        context.put(config.outputVariable(), output);

        return output;
    }

    private Map<String, Object> resolveInputMapping(Map<String, String> inputMapping, Map<String, Object> context) {
        Map<String, Object> resolvedInput = new HashMap<>();

        if (inputMapping == null || inputMapping.isEmpty()) {
            return resolvedInput;
        }

        inputMapping.forEach((inputName, expression) ->
                resolvedInput.put(inputName, resolveExpression(expression, context))
        );

        return resolvedInput;
    }

    private Object resolveExpression(String expression, Map<String, Object> context) {
        if (expression == null) {
            return null;
        }

        if (expression.startsWith("{{") && expression.endsWith("}}")) {
            String variableName = expression
                    .substring(2, expression.length() - 2)
                    .trim();

            return context.get(variableName);
        }

        return expression;
    }

    private <T> T readConfig(String configJson, Class<T> configClass) {
        try {
            return objectMapper.readValue(configJson, configClass);
        } catch (Exception exception) {
            throw new IllegalArgumentException(
                    "Invalid node config JSON for " + configClass.getSimpleName(),
                    exception
            );
        }
    }
}