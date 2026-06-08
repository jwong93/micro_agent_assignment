package com.jiakuang.assignment.exception;

public class ToolNotFoundException extends RuntimeException {
    public ToolNotFoundException(Long id) {
        super("Tool not found: " + id);
    }

    public ToolNotFoundException(String code) {
        super("Tool not found: " + code);
    }
}
