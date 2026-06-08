package com.jiakuang.assignment.exception;


import com.jiakuang.assignment.dto.FlowNotFoundDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({WorkflowNodeNotFoundException.class, WorkflowNotFoundException.class, ToolNotFoundException.class})
    public ResponseEntity<FlowNotFoundDTO> handleFlowNotFound(RuntimeException runtimeException){
        FlowNotFoundDTO dto = FlowNotFoundDTO.builder()
                .httpStatus(HttpStatus.NOT_FOUND.value())
                .message(runtimeException.getMessage())
                .errorTime(LocalDateTime.now())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(dto);

    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<FlowNotFoundDTO> handleIllegalArgument(IllegalArgumentException illegalArgumentException){
        FlowNotFoundDTO dto = FlowNotFoundDTO.builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .message(illegalArgumentException.getMessage())
                .errorTime(LocalDateTime.now())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);

    }

}


