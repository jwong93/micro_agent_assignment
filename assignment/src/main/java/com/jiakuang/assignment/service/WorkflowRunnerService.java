package com.jiakuang.assignment.service;

import com.jiakuang.assignment.dto.WorkflowRunResponseDTO;

public interface WorkflowRunnerService {
    WorkflowRunResponseDTO runWorkflow(Long workflowId);
}
