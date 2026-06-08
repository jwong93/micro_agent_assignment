package com.jiakuang.assignment.service.impl;


import com.jiakuang.assignment.service.PromptExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PromptExecutionServiceImpl implements PromptExecutionService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public String executePrompt(String userPromptTemplate, Map<String, Object> context) {
        String resolvedUserPrompt = resolveTemplate(userPromptTemplate, context);

        return chatClient
                .prompt()
                .system("""
                        You are a helpful workflow AI assistant.
                        Use only the data provided by the workflow.
                        If the data is insufficient, state what is missing.
                        Return a clear and concise answer.
                        """)
                .user(resolvedUserPrompt)
                .call()
                .content();
    }

    private String resolveTemplate(String template, Map<String, Object> context) {
        if (template == null || template.isBlank()) {
            return "";
        }

        String resolved = template;

        for (Map.Entry<String, Object> entry : context.entrySet()) {
            String placeholder = "{{" + entry.getKey() + "}}";
            resolved = resolved.replace(placeholder, stringify(entry.getValue()));
        }

        return resolved;
    }

    private String stringify(Object value) {
        if (value == null) {
            return "";
        }

        if (value instanceof String stringValue) {
            return stringValue;
        }

        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception exception) {
            return String.valueOf(value);
        }
    }

}


