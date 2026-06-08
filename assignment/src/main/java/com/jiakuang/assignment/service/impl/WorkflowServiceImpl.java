package com.jiakuang.assignment.service.impl;


import com.jiakuang.assignment.dto.WorkflowDTO;
import com.jiakuang.assignment.dto.WorkflowNodeDTO;
import com.jiakuang.assignment.entity.Workflow;
import com.jiakuang.assignment.entity.WorkflowNode;
import com.jiakuang.assignment.exception.WorkflowNotFoundException;
import com.jiakuang.assignment.mapper.WorkflowMapper;
import com.jiakuang.assignment.repository.ToolNodeRepository;
import com.jiakuang.assignment.repository.WorkflowRepository;
import com.jiakuang.assignment.service.WorkflowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkflowServiceImpl implements WorkflowService {

    private final WorkflowRepository workflowRepository;

    private final ToolNodeRepository toolNodeRepository;

    @Transactional(readOnly = true)
    public List<WorkflowDTO> retrieveWorkFlowDTOs(){
        List<Workflow> workflows = workflowRepository.findAll();
        return workflows.stream()
                .map(WorkflowMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public WorkflowDTO retrieveWorkflowDTO(long id){
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowNotFoundException(id));

        return WorkflowMapper.toDto(workflow);
    }

    @Transactional
    public WorkflowDTO createWorkFlow(WorkflowDTO request){
        Workflow workflow = WorkflowMapper.toEntity(request);
        workflowRepository.save(workflow);
        return WorkflowMapper.toDto(workflow);
    }

    @Transactional
    public WorkflowDTO updateWorkflow(Long id, WorkflowDTO request){
        Workflow updateWorkflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowNotFoundException(id));

        updateWorkflow.setName(request.name());
        updateWorkflow.setDescription(request.description());
        removeWorkflowNodes(request, updateWorkflow);
        updateNode(request, updateWorkflow);
        addNewNodesToExistingWorkFlow(request, updateWorkflow);

        return WorkflowMapper.toDto(updateWorkflow);

    }

    private void removeWorkflowNodes(WorkflowDTO request, Workflow workflow){

        Set<Long> requestedIds = request.nodes().stream().map(WorkflowNodeDTO::id)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        workflow.getNodes().removeIf(existingNode ->
                existingNode.getId() != null
                        && !requestedIds.contains(existingNode.getId()));

    }

    private void addNewNodesToExistingWorkFlow(WorkflowDTO workflowDTO, Workflow workflow){
        workflowDTO.nodes().stream()
                .filter(node -> Objects.isNull(node.id()))
                .map(node -> WorkflowMapper.toNodeEntity(node, workflow))
                .forEach(workflow::addNode);

    }

    private void updateNode(WorkflowDTO workflowDTO, Workflow workflow) {

        Map<Long, WorkflowNode> existingNodes = workflow.getNodes()
                .stream()
                .filter(node -> node.getId() != null)
                .collect(Collectors.toMap(
                        WorkflowNode::getId,
                        Function.identity()
                ));

        workflowDTO.nodes().forEach(node -> {
            if (existingNodes.containsKey(node.id())) {
                WorkflowNode workflowNode = existingNodes.get(node.id());
                workflowNode.setName(node.name());
                workflowNode.setDescription(node.description());
                workflowNode.setNodeType(node.nodeType());
                workflowNode.setPosition(node.position());
                workflowNode.setConfigJson(node.config());
                workflowNode.setWorkflow(workflow);
            }
        });
    }
}
