package com.jiakuang.assignment.dto;

import com.jiakuang.assignment.enums.NodeType;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.Map;

@Builder(toBuilder = true)
public record WorkflowNodeDTO(

        @Nullable
        Long id,

        @NotBlank(message = "Node name is required")
        String name,

        String description,

        @NotNull(message = "Node position is empty!")
        @Min(0)
        Integer position,

        @NotNull(message = "Node type is required!")
        NodeType nodeType,

        @NotNull(message = "Node config is required")
        String config
){}