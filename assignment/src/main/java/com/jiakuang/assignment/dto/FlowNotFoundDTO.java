package com.jiakuang.assignment.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FlowNotFoundDTO(
        int httpStatus,
        String message,
        LocalDateTime errorTime
) {
}
