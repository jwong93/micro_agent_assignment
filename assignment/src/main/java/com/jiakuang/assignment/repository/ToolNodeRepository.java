package com.jiakuang.assignment.repository;

import com.jiakuang.assignment.entity.ToolNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToolNodeRepository  extends JpaRepository<ToolNode, Long> {

    Optional<ToolNode> findByCode(String code);

    boolean existsByCode(String code);

    List<ToolNode> findAllByOrderByNameAsc();
}
