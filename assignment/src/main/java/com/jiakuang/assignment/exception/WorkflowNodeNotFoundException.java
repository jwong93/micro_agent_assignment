package com.jiakuang.assignment.exception;

public class WorkflowNodeNotFoundException extends RuntimeException {
    public WorkflowNodeNotFoundException(Long id) {
        super("WorkflowNode not found! "+ id);
    }
}
