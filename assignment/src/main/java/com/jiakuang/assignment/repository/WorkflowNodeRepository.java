package com.jiakuang.assignment.repository;

import com.jiakuang.assignment.entity.WorkflowNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkflowNodeRepository extends JpaRepository<WorkflowNode, Long> {

    List<WorkflowNode> findByWorkflowIdOrderByPositionAsc(Long workflowId);
}