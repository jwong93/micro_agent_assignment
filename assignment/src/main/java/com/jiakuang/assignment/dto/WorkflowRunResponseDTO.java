package com.jiakuang.assignment.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record WorkflowRunResponseDTO (
        Long workflowId,
        String status,
        List<WorkflowRunLogDTO> logs,
        Map<String, Object> context,
        Object finalOutput
){
}
