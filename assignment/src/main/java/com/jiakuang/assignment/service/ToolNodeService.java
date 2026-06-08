package com.jiakuang.assignment.service;

import com.jiakuang.assignment.dto.ToolDTO;
import com.jiakuang.assignment.dto.ToolExecutionDTO;
import com.jiakuang.assignment.entity.ToolNode;

import java.util.List;
import java.util.Map;

public interface ToolNodeService {
    List<ToolDTO> getTools();

    ToolDTO getTool(Long id);

    ToolNode getToolEntityByCode(String code);

    ToolDTO createTool(ToolDTO request);

    ToolDTO updateTool(Long id, ToolDTO request);

    ToolExecutionDTO executeTool(String toolCode, Map<String, Object> input);

}
