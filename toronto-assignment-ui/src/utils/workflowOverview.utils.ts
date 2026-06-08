import {
  Brain,
  Database,
  FileText,
  Workflow as WorkflowIcon,
} from "lucide-react";
import type { Workflow, NodeType } from "../types/worfklow.type";



export type OverviewItem = {
  id: string;
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
};

function countNodesByType(workflow: Workflow, type: NodeType) {
  return workflow.nodes.filter((node) => node.nodeType === type).length;
}

export function buildWorkflowOverviewItems(workflow: Workflow): OverviewItem[] {
  return [
    {
      id: "total-nodes",
      label: "Total Nodes",
      value: workflow.nodes.length,
      description: "Workflow steps",
      icon: WorkflowIcon,
    },
    {
      id: "input-nodes",
      label: "Input Nodes",
      value: countNodesByType(workflow, "INPUT"),
      description: "User variables",
      icon: FileText,
    },
    {
      id: "tool-nodes",
      label: "Tool Nodes",
      value: countNodesByType(workflow, "TOOL"),
      description: "Data actions",
      icon: Database,
    },
    {
      id: "prompt-nodes",
      label: "Prompt Nodes",
      value: countNodesByType(workflow, "PROMPT"),
      description: "AI responses",
      icon: Brain,
    },
  ];
}