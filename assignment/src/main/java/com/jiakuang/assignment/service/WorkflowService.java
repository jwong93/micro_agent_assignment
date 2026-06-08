package com.jiakuang.assignment.service;

import com.jiakuang.assignment.dto.WorkflowDTO;

import java.util.List;

public interface WorkflowService {

    List<WorkflowDTO> retrieveWorkFlowDTOs();

    WorkflowDTO retrieveWorkflowDTO(long id);

    WorkflowDTO createWorkFlow(WorkflowDTO request);

    WorkflowDTO updateWorkflow(Long id, WorkflowDTO request);

}
