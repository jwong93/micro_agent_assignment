package com.jiakuang.assignment.dto;

public record WorkflowRunLogDTO(
        Long nodeId,
        String nodeName,
        String nodeType,
        String status,
        Object output
) {
}
