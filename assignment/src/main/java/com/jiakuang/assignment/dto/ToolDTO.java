package com.jiakuang.assignment.dto;

import com.jiakuang.assignment.enums.ToolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ToolDTO (
        Long id,

        @NotBlank(message = "Tool code is required")
        String code,

        @NotBlank(message = "Tool name is required")
        String name,

        String description,

        @NotNull(message = "Tool type is required")
        ToolType toolType,

        String configJson,

        String inputSchemaJson,

        String outputSchemaJson,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
)
{}
