package com.jiakuang.assignment.dto;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record WorkflowDTO(
        
        @Nullable
        Long id,

        @NotBlank(message = "Workflow name is required")
        String name,

        String description,

        @Valid
        @NotEmpty(message = "Workflow must contain at least one node")
        List<WorkflowNodeDTO> nodes,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
){}