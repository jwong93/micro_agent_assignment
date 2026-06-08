import { useEffect, useMemo, useState } from "react";

import type {
  NodeType,
  WorkflowNodeData,
  Workflow,
  WorkflowRunResult,
} from "../types/worfklow.type";
import {saveWorkflow, fetchWorkflows, runWorkflow } from "../services/WorkflowApi";

function createNode(type: NodeType): WorkflowNodeData {
  const id = crypto.randomUUID();

  if (type === "INPUT") {
    return {
      id,
      nodeType: "INPUT",
      name: "New Input Node",
      description: "Define a new input variable.",
      config: {
        variableName: "",
        value: "",
      },
    };
  }

  if (type === "TOOL") {
    return {
      id,
      nodeType: "TOOL",
      name: "New Tool Node",
      description: "Run a tool and store its output.",
      config: {
        toolCode: "",
        inputMapping: {},
        outputVariable: "",
      },
    };
  }

  return {
    id,
    nodeType: "PROMPT",
    name: "New Prompt Node",
    description: "Generate a response using previous variables.",
    config: {
      prompt: "",
      outputVariable: "",
    },
  };
}

export function useWorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState("");

  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [runResult, setRunResult] = useState<WorkflowRunResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    try {
      setLoading(true);
      setErrorMessage("");

      const loadedWorkflows = await fetchWorkflows();

      setWorkflows(loadedWorkflows);

      const defaultWorkflow = loadedWorkflows[0] ?? null;
      const defaultNode = defaultWorkflow?.nodes[0] ?? null;

      setSelectedWorkflowId(defaultWorkflow?.id ?? "");
      setSelectedNodeId(defaultNode?.id ?? "");
      setRunResult(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load workflows"
      );

      setWorkflows([]);
      setSelectedWorkflowId("");
      setSelectedNodeId("");
      setRunResult(null);
    } finally {
      setLoading(false);
    }
  }

  const selectedWorkflow = useMemo(() => {
    if (workflows.length === 0) {
      return null;
    }

    return (
      workflows.find((workflow) => workflow.id === selectedWorkflowId) ??
      workflows[0]
    );
  }, [workflows, selectedWorkflowId]);

  const selectedNode = useMemo(() => {
    if (!selectedWorkflow) {
      return null;
    }

    return (
      selectedWorkflow.nodes.find(
        (node) => String(node.id) === String(selectedNodeId)
      ) ?? selectedWorkflow.nodes[0] ?? null
    );
  }, [selectedWorkflow, selectedNodeId]);

  function selectWorkflow(workflowId: string) {
    const nextWorkflow =
      workflows.find((workflow) => workflow.id === workflowId) ?? null;

    if (!nextWorkflow) {
      return;
    }

    setSelectedWorkflowId(nextWorkflow.id);
    setSelectedNodeId(nextWorkflow.nodes[0]?.id ?? "");
    setRunResult(null);
    setErrorMessage("");
  }

  function updateSelectedWorkflow(updatedWorkflow: Workflow) {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === updatedWorkflow.id ? updatedWorkflow : workflow
      )
    );
  }

  function updateNode(updatedNode: WorkflowNodeData) {
    if (!selectedWorkflow) {
      return;
    }

    const updatedWorkflow: Workflow = {
      ...selectedWorkflow,
      nodes: selectedWorkflow.nodes.map((node) =>
        node.id === updatedNode.id ? updatedNode : node
      ),
    };

    updateSelectedWorkflow(updatedWorkflow);
  }

  function addNode(type: NodeType) {
    if (!selectedWorkflow) {
      return;
    }

    const newNode = createNode(type);

    const updatedWorkflow: Workflow = {
      ...selectedWorkflow,
      nodes: [...selectedWorkflow.nodes, newNode],
    };

    updateSelectedWorkflow(updatedWorkflow);
    setSelectedNodeId(newNode.id);
  }

  function moveNode(nodeId: string, direction: "UP" | "DOWN") {
  if (!selectedWorkflowId) {
    return;
  }

  setWorkflows((current) =>
    current.map((workflow) => {
      if (String(workflow.id) !== String(selectedWorkflowId)) {
        return workflow;
      }

      const currentIndex = workflow.nodes.findIndex(
        (node) => String(node.id) === String(nodeId)
      );

      if (currentIndex === -1) {
        return workflow;
      }

      const nextIndex =
        direction === "UP" ? currentIndex - 1 : currentIndex + 1;

      if (nextIndex < 0 || nextIndex >= workflow.nodes.length) {
        return workflow;
      }

      const reorderedNodes = [...workflow.nodes];

      const currentNode = reorderedNodes[currentIndex];
      reorderedNodes[currentIndex] = reorderedNodes[nextIndex];
      reorderedNodes[nextIndex] = currentNode;

      return {
        ...workflow,
        nodes: reorderedNodes,
      };
    })
  );
}

  function deleteSelectedNode() {
    if (!selectedWorkflow || !selectedNode) {
      return;
    }

    const remainingNodes = selectedWorkflow.nodes.filter(
      (node) => node.id !== selectedNode.id
    );

    const updatedWorkflow: Workflow = {
      ...selectedWorkflow,
      nodes: remainingNodes,
    };

    updateSelectedWorkflow(updatedWorkflow);
    setSelectedNodeId(remainingNodes[0]?.id ?? "");
  }

  async function runSelectedWorkflow() {
    if (!selectedWorkflow) {
      return;
    }

    try {
      setRunning(true);
      setErrorMessage("");
      setRunResult(null);

      const result = await runWorkflow(selectedWorkflow.id);

      setRunResult(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to run workflow"
      );
    } finally {
      setRunning(false);
    }
  }

  function addWorkflow() {
  const newWorkflow: Workflow = {
    id: crypto.randomUUID(),
    name: "New Workflow",
    description: "Build your workflow by adding input, tool, and prompt nodes.",
    nodes: [],
  };

  setWorkflows((current) => [...current, newWorkflow]);
  setSelectedWorkflowId(newWorkflow.id);
  setSelectedNodeId("");
  setRunResult(null);
  setErrorMessage("");
}

async function saveSelectedWorkflow() {
  if (!selectedWorkflow) {
    return;
  }

  try {
    setSaving(true);
    setErrorMessage("");
    setSaveMessage("");

    const savedWorkflow = await saveWorkflow(selectedWorkflow);

    setWorkflows((current) => {
      const existingWorkflow = current.some(
        (workflow) => workflow.id === selectedWorkflow.id
      );

      if (existingWorkflow) {
        return current.map((workflow) =>
          workflow.id === selectedWorkflow.id ? savedWorkflow : workflow
        );
      }

      return [...current, savedWorkflow];
    });

    setSelectedWorkflowId(savedWorkflow.id);
    setSelectedNodeId(savedWorkflow.nodes[0]?.id ?? "");
    setSaveMessage("Workflow saved");
  } catch (error) {
    setErrorMessage(
      error instanceof Error ? error.message : "Failed to save workflow"
    );
  } finally {
    setSaving(false);
  }
}

function updateWorkflowMetaData(values: Partial<Pick<Workflow, "name" | "description">>) {
  console.log(JSON.stringify(selectedWorkflow))
  if (!selectedWorkflow) {
    return;
  }
  
  const updatedWorkflow: Workflow = {
    ...selectedWorkflow,
    ...values,
  };
 
  updateSelectedWorkflow(updatedWorkflow);
}


  return {
    workflows,
    selectedWorkflow,
    selectedWorkflowId,
    selectedNode,
    selectedNodeId,
    saveMessage,
    loading,
    saving,
    running,
    errorMessage,
    runResult,

    selectWorkflow,
    setSelectedNodeId,
    updateNode,
    addNode,
    deleteSelectedNode,
    reloadWorkflows: loadWorkflows,
    runSelectedWorkflow,
    addWorkflow,
    saveSelectedWorkflow,
    updateWorkflowMetaData,
    moveNode
  };
}