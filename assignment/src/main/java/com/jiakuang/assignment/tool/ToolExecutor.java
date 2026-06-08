package com.jiakuang.assignment.tool;

import com.jiakuang.assignment.entity.ToolNode;
import com.jiakuang.assignment.enums.ToolType;

import java.util.Map;

public interface ToolExecutor {

    ToolType type();

    Object execute(ToolNode node, Map<String, Object> configs);

}
