package com.jiakuang.assignment.mapper;

import com.jiakuang.assignment.dto.WorkflowDTO;
import com.jiakuang.assignment.dto.WorkflowNodeDTO;
import com.jiakuang.assignment.entity.Workflow;
import com.jiakuang.assignment.entity.WorkflowNode;

import java.util.List;

public final class WorkflowMapper {

    public static WorkflowDTO toDto(Workflow workflow){
        return WorkflowDTO.builder()
                .id(workflow.getId())
                .name(workflow.getName())
                .description(workflow.getDescription())
                .createdAt(workflow.getCreatedAt())
                .updatedAt(workflow.getUpdatedAt())
                .nodes(
                        workflow.getNodes()
                                .stream()
                                .map(WorkflowMapper::toNodeDto)
                                .toList()
                )
                .build();

    }

    public static Workflow toEntity(WorkflowDTO workflowDTO){
        Workflow workflow =  Workflow.builder()
                                .id(workflowDTO.id())
                                .name(workflowDTO.name())
                                .description(workflowDTO.description())
                                .build();

        List<WorkflowNode> workflowNodes = workflowDTO.nodes()
                .stream().map(node -> toNodeEntity(node, workflow))
                .toList();

        workflow.setNodes(workflowNodes);
        return workflow;

    }

    public static WorkflowNodeDTO toNodeDto(WorkflowNode node) {
        return WorkflowNodeDTO.builder()
                .id(node.getId())
                .name(node.getName())
                .description(node.getDescription())
                .nodeType(node.getNodeType())
                .config(node.getConfigJson())
                .position(node.getPosition())
                .build();
    }

    public static WorkflowNode toNodeEntity(WorkflowNodeDTO workflowNodeDTO, Workflow workflow){
        return WorkflowNode.builder()
                .id(workflowNodeDTO.id())
                .name(workflowNodeDTO.name())
                .description(workflowNodeDTO.description())
                .configJson(workflowNodeDTO.config())
                .position(workflowNodeDTO.position())
                .nodeType(workflowNodeDTO.nodeType())
                .workflow(workflow)
                .build();
    }



}
