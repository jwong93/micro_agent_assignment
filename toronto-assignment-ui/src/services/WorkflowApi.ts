import type { Workflow, WorkflowNodeData, WorkflowRunResult } from "../types/worfklow.type";


const API_BASE_URL = "/api";



export async function fetchWorkflows(): Promise<Workflow[]> {
  const response = await fetch(`${API_BASE_URL}/workflow`);
  
  if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message ?? "Failed to fetch workflows");
    }
  
    const workflows = await response.json();

    return workflows.map((workflow: any) => ({
      ...workflow,
      nodes: workflow.nodes.map((node: any) => ({
        ...node,
        config: JSON.parse(node.config),
      })),
    }));
}

export async function runWorkflow(workflowId: string): Promise<WorkflowRunResult> {
  console.log(workflowId)
  const response = await fetch(`${API_BASE_URL}/workflow/${workflowId}/run`,
    {
      method: "POST",
    }
  );

 if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message ?? "Failed to run workflow");
    }

    const data = (await response.json()) as WorkflowRunResult;
    return data;
}


export async function saveWorkflow(workflow: Workflow): Promise<Workflow> {

  const isExistingWorkflow = typeof workflow.id === "string" && /^\d+$/.test(workflow.id)

  const backendWorkflow = {
    id: isExistingWorkflow? Number(workflow.id) : null,
    name: workflow.name,
    description: workflow.description,
    nodes: workflow.nodes.map((node, index) => ({
      id: isExistingWorkflow ? Number(node.id) : null,
      name: node.name,
      description: node.description,
      position: index,
      nodeType: node.nodeType,
      config: JSON.stringify(node.config),
    })),
  };


  const response = await fetch(
    isExistingWorkflow
      ? `${API_BASE_URL}/workflow/update/${workflow.id}`
      : `${API_BASE_URL}/workflow`,
    {
      method: isExistingWorkflow ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendWorkflow),
    }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? "Failed to save workflow");
  }

  const data = await response.json();

  return toFrontendWorkflow(data)
}

function toFrontendWorkflow(data: any): Workflow {
  return {
    id: String(data.id),
    name: data.name,
    description: data.description ?? "",
    nodes: [...(data.nodes ?? [])]
      .sort((a, b) => a.position - b.position)
      .map(toFrontendNode),
  };
}

function toFrontendNode(node: any): WorkflowNodeData {
  const nodeType = String(node.nodeType ?? node.type ?? "").toUpperCase();

  const base = {
    id: node.id == null ? crypto.randomUUID() : String(node.id),
    name: node.name ?? node.title ?? "",
    description: node.description ?? "",
  };

  if (nodeType === "INPUT") {
    return {
      ...base,
      nodeType: "INPUT",
      config: parseConfig(node.config, {
        variableName: "",
        value: "",
      }),
    };
  }

  if (nodeType === "TOOL") {
    const config = parseConfig<any>(node.config, {
      toolCode: "",
      inputMapping: {},
      outputVariable: "",
    });

    return {
      ...base,
      nodeType: "TOOL",
      config: {
        toolCode: config.toolCode ?? config.toolName ?? "",
        inputMapping: config.inputMapping ?? {},
        outputVariable: config.outputVariable ?? "",
      },
    };
  }

  if (nodeType === "PROMPT") {
    return {
      ...base,
      nodeType: "PROMPT",
      config: parseConfig(node.config, {
        prompt: "",
        outputVariable: "",
      }),
    };
  }

  throw new Error(`Unknown node type from backend after save: ${node.nodeType}`);
}


function parseConfig<T>(config: string | undefined, fallback: T): T {
  if (!config) {
    return fallback;
  }

  try {
    return JSON.parse(config) as T;
  } catch {
    return fallback;
  }
}



