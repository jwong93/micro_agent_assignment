package com.jiakuang.assignment.service.impl;

import com.jiakuang.assignment.dto.ToolDTO;
import com.jiakuang.assignment.dto.ToolExecutionDTO;
import com.jiakuang.assignment.entity.ToolNode;
import com.jiakuang.assignment.exception.ToolNotFoundException;
import com.jiakuang.assignment.mapper.ToolMapper;
import com.jiakuang.assignment.repository.ToolNodeRepository;
import com.jiakuang.assignment.service.ToolNodeService;
import com.jiakuang.assignment.tool.ToolExecutor;
import com.jiakuang.assignment.tool.ToolRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class ToolNodeServiceImpl implements ToolNodeService {

    private final ToolNodeRepository toolNodeRepository;

    private final ToolRegistry toolRegistry;

    @Transactional(readOnly = true)
    public List<ToolDTO> getTools() {
        return toolNodeRepository.findAllByOrderByNameAsc()
                .stream()
                .map(ToolMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ToolDTO getTool(Long id) {
        ToolNode tool = toolNodeRepository.findById(id)
                .orElseThrow(() -> new ToolNotFoundException(id));

        return ToolMapper.toDto(tool);
    }

    @Transactional(readOnly = true)
    public ToolNode getToolEntityByCode(String code) {
        return toolNodeRepository.findByCode(code)
                .orElseThrow(() -> new ToolNotFoundException(code));
    }

    @Transactional
    public ToolDTO createTool(ToolDTO request) {
        if (toolNodeRepository.existsByCode(request.code())) {
            throw new IllegalArgumentException(
                    "Tool code already exists: " + request.code()
            );
        }

        ToolNode tool = ToolMapper.toEntity(request);
        ToolNode savedTool = toolNodeRepository.save(tool);

        return ToolMapper.toDto(savedTool);
    }

    @Transactional
    public ToolDTO updateTool(Long id, ToolDTO request) {
        ToolNode tool = toolNodeRepository.findById(id)
                .orElseThrow(() -> new ToolNotFoundException(id));

        ToolMapper.updateEntity(tool, request);

        return ToolMapper.toDto(tool);
    }

    @Transactional(readOnly = true)
    public ToolExecutionDTO executeTool(String toolCode, Map<String, Object> input) {
        ToolNode toolNode = toolNodeRepository.findByCode(toolCode)
                .orElseThrow(() -> new ToolNotFoundException(toolCode));

        ToolExecutor executor = toolRegistry.getExecutor(
                toolNode.getToolType()
        );

        Object output = executor.execute(toolNode, input);

        return new ToolExecutionDTO(
                toolNode.getCode(),
                "SUCCESS",
                output
        );
    }
}
