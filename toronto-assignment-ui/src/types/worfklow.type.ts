export type NodeType = "INPUT" | "TOOL" | "PROMPT";

export type InputNodeConfig = {
  variableName: string;
  value: string;
};

export type ToolNodeConfig = {
  toolCode: string;
  inputMapping: Record<string, string>;
  outputVariable: string;
};

export type PromptNodeConfig = {
  prompt: string;
  outputVariable: string;
};

export type InputWorkflowNodeData = {
  id: string;
  nodeType: "INPUT";
  name: string;
  description: string;
  config: InputNodeConfig;
};

export type ToolWorkflowNodeData = {
  id: string;
  nodeType: "TOOL";
  name: string;
  description: string;
  config: ToolNodeConfig;
};

export type PromptWorkflowNodeData = {
  id: string;
  nodeType: "PROMPT";
  name: string;
  description: string;
  config: PromptNodeConfig;
};

export type WorkflowNodeData =
  | InputWorkflowNodeData
  | ToolWorkflowNodeData
  | PromptWorkflowNodeData;

export type Workflow = {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNodeData[];
};

export type WorkflowRunLog = {
  nodeId: string;
  nodeName: string;
  nodeType: NodeType;
  status: string;
  output: unknown;
};

export type WorkflowRunResult = {
  workflowId: string;
  status: string;
  logs: WorkflowRunLog[];
  context: Record<string, unknown>;
  finalOutput: unknown;
};