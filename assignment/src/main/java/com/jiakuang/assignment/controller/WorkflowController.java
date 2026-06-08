package com.jiakuang.assignment.controller;

import com.jiakuang.assignment.dto.WorkflowDTO;
import com.jiakuang.assignment.dto.WorkflowRunResponseDTO;
import com.jiakuang.assignment.service.WorkflowRunnerService;
import com.jiakuang.assignment.service.WorkflowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    private final WorkflowRunnerService workflowRunnerService;

    @GetMapping
    public ResponseEntity<List<WorkflowDTO>> getWorkFlows(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(workflowService.retrieveWorkFlowDTOs());
    }

    @GetMapping("/{workflowId}")
    public ResponseEntity<WorkflowDTO> getWorkflow(@PathVariable Long workflowId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(workflowService.retrieveWorkflowDTO(workflowId));
    }

    @PostMapping
    public ResponseEntity<WorkflowDTO> createWorkFlow(@Valid @RequestBody WorkflowDTO workflowDTO){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workflowService.createWorkFlow(workflowDTO));
    }

    @PutMapping("/update/{workflowId}")
    public ResponseEntity<WorkflowDTO> updateWorkFlow(@PathVariable Long workflowId,
                                                      @Valid @RequestBody WorkflowDTO workflowDTO){
        return ResponseEntity.status(HttpStatus.OK)
                .body(workflowService.updateWorkflow(workflowId, workflowDTO));
    }

    @PostMapping("/{id}/run")
    public ResponseEntity<WorkflowRunResponseDTO> runWorkflow(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(workflowRunnerService.runWorkflow(id));
    }




}
