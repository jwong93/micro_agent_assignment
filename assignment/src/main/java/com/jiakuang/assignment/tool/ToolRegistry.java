package com.jiakuang.assignment.tool;

import com.jiakuang.assignment.enums.ToolType;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class ToolRegistry {

    private final Map<ToolType, ToolExecutor> toolExecutors;

    public ToolRegistry(List<ToolExecutor> executors) {
        this.toolExecutors = executors.stream()
                .collect(Collectors.toMap(
                        ToolExecutor::type,
                        Function.identity()
                ));
    }

    public ToolExecutor getExecutor(ToolType toolKind) {
        ToolExecutor executor = toolExecutors.get(toolKind);

        return Optional.ofNullable(executor).orElseThrow(() -> new IllegalArgumentException(
                "No executor found for tool kind: " + toolKind
        ));

    }
}
