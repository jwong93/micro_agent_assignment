package com.jiakuang.assignment.mapper;

import com.jiakuang.assignment.dto.ToolDTO;
import com.jiakuang.assignment.entity.ToolNode;

public final class ToolMapper {

    public static ToolDTO toDto(ToolNode tool) {
        return new ToolDTO(
                tool.getId(),
                tool.getCode(),
                tool.getName(),
                tool.getDescription(),
                tool.getToolType(),
                tool.getConfigJson(),
                tool.getInputSchemaJson(),
                tool.getOutputSchemaJson(),
                tool.getCreatedAt(),
                tool.getUpdatedAt()
        );
    }

    public static ToolNode toEntity(ToolDTO dto) {
        return ToolNode.builder()
                .code(dto.code())
                .name(dto.name())
                .description(dto.description())
                .toolType(dto.toolType())
                .configJson(dto.configJson())
                .inputSchemaJson(dto.inputSchemaJson())
                .outputSchemaJson(dto.outputSchemaJson())
                .build();
    }

    public static void updateEntity(
            ToolNode tool,
            ToolDTO dto
    ) {
        tool.setCode(dto.code());
        tool.setName(dto.name());
        tool.setDescription(dto.description());
        tool.setToolType(dto.toolType());
        tool.setConfigJson(dto.configJson());
        tool.setInputSchemaJson(dto.inputSchemaJson());
        tool.setOutputSchemaJson(dto.outputSchemaJson());
    }
}
