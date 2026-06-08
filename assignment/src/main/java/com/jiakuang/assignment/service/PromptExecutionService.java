package com.jiakuang.assignment.service;

import java.util.Map;

public interface PromptExecutionService {

    String executePrompt(String userPromptTemplate, Map<String, Object> context);
}
