package com.jiakuang.assignment.entity;


import com.jiakuang.assignment.enums.ToolType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.enabled;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tool_node")
public class ToolNode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="code", nullable = false, unique = true)
    private String code;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name="tool_type", nullable = false)
    private ToolType toolType;

    @Column(name = "config_json", columnDefinition = "TEXT")
    private String configJson;

    @Column(name="input_schema", columnDefinition = "TEXT")
    private String inputSchemaJson;

    @Column(name="output_schema",columnDefinition = "TEXT")
    private String outputSchemaJson;


    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }


}
