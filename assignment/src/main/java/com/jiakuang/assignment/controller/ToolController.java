package com.jiakuang.assignment.controller;

import com.jiakuang.assignment.dto.ToolDTO;
import com.jiakuang.assignment.dto.ToolExectutionRequest;
import com.jiakuang.assignment.dto.ToolExecutionDTO;
import com.jiakuang.assignment.service.ToolNodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tools")
@RequiredArgsConstructor
public class ToolController {

    private final ToolNodeService toolNodeService;

    @GetMapping
    public ResponseEntity<List<ToolDTO>> getAllTools() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(toolNodeService.getTools());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToolDTO> getTool(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(toolNodeService.getTool(id));
    }

    @PostMapping
    public ResponseEntity<ToolDTO> createTool(@Valid @RequestBody ToolDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toolNodeService.createTool(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ToolDTO> updateTool(@PathVariable Long id, @Valid @RequestBody ToolDTO request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(toolNodeService.updateTool(id, request));
    }

    @PostMapping("/{code}/execute")
    public ResponseEntity<ToolExecutionDTO> executeTool(@PathVariable String code, @RequestBody(required = false)
                                                            ToolExectutionRequest request
    ) {
        Map<String, Object> input = Optional.ofNullable(request)
                .map(ToolExectutionRequest::input)
                .orElse(Map.of());

        return ResponseEntity.status(HttpStatus.OK)
                .body(toolNodeService.executeTool(code, input));
    }
}