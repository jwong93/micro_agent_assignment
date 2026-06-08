package com.jiakuang.assignment.model;

import java.util.Map;

public record ToolNodeModel(String toolCode,
                            Map<String, String> inputMapping,
                            String outputVariable) {
}
