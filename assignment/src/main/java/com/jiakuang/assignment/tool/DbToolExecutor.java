package com.jiakuang.assignment.tool;

import com.jiakuang.assignment.entity.ToolNode;
import com.jiakuang.assignment.enums.ToolType;
import com.jiakuang.assignment.tool.common.CommonConst;
import com.jiakuang.assignment.tool.model.DbToolConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;


@RequiredArgsConstructor
@Component
public class DbToolExecutor implements ToolExecutor{

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public ToolType type() {
        return ToolType.DB_TOOL;
    }

    @Override
    public Object execute(ToolNode node, Map<String, Object> configs) {
        DbToolConfig config = readConfig(node.getConfigJson());
        validateSqlStatement(config.sql());
        return jdbcTemplate.queryForList(config.sql(), configs);
    }

    private DbToolConfig readConfig(String configJson) {
        try {
            return objectMapper.readValue(configJson, DbToolConfig.class);
        } catch (Exception exception) {
            throw new IllegalArgumentException("Invalid DB tool config", exception);
        }
    }

    private void validateSqlStatement(String sql){

        if (sql == null || sql.isBlank()) {
            throw new IllegalArgumentException("SQL query is required");
        }

        String normalizedSql = sql
                .trim()
                .toLowerCase()
                .replaceAll("\\s+", " ");


        boolean hasBlockedKeyword = CommonConst.blockedSqlKeyWords().stream()
                .anyMatch(normalizedSql::contains);

        if (!normalizedSql.startsWith("select ") || hasBlockedKeyword) {
            throw new IllegalArgumentException("Only SELECT queries are allowed!");
        }

    }
}
