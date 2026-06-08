package com.jiakuang.assignment.exception;

public class WorkflowNotFoundException extends RuntimeException {
    public WorkflowNotFoundException(Long id) {
        super("Workflow not found! "+ id);
    }
}
