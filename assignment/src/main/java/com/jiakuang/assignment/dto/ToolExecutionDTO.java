package com.jiakuang.assignment.dto;

public record ToolExecutionDTO(
        String toolCode,
        String status,
        Object output
)
{}
