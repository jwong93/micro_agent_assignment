import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "../lib/cn";
import { ui } from "../styles/ui";
import type { WorkflowNodeData, NodeType } from "../types/worfklow.type";
import WorkflowNodeCard from "./WorkflowNodeCard";

type WorkflowCanvasProps = {
  nodes: WorkflowNodeData[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onAddNode: (type: NodeType) => void;
  onMoveNode: (nodeId: string, direction: "UP" | "DOWN") => void;
};

function WorkflowCanvas({
  nodes,
  selectedNodeId,
  onSelectNode,
  onAddNode,
  onMoveNode,
}: WorkflowCanvasProps) {
  return (
    <section className={ui.canvas.shell}>
      <WorkflowCanvasHeader onAddNode={onAddNode} />

      {nodes.length === 0 ? (
        <WorkflowCanvasEmptyState />
      ) : (
        <WorkflowCanvasFlow
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onMoveNode={onMoveNode}
        />
      )}
    </section>
  );
}

function WorkflowCanvasHeader(props: {
  onAddNode: (type: NodeType) => void;
}) {
  return (
    <div className={ui.canvas.floatingHeader}>
      <h2 className={ui.canvas.title}>Workflow Canvas</h2>

      <p className={ui.canvas.description}>Input → Tool → Tool → Prompt</p>

      <div className={ui.canvas.addButtonRow}>
        <AddNodeButton
          label="+ Input"
          variant="input"
          onClick={() => props.onAddNode("INPUT")}
        />

        <AddNodeButton
          label="+ Tool"
          variant="tool"
          onClick={() => props.onAddNode("TOOL")}
        />

        <AddNodeButton
          label="+ Prompt"
          variant="prompt"
          onClick={() => props.onAddNode("PROMPT")}
        />
      </div>
    </div>
  );
}

function AddNodeButton(props: {
  label: string;
  variant: "input" | "tool" | "prompt";
  onClick: () => void;
}) {
  const variantClassName =
    props.variant === "input"
      ? ui.canvas.addButtonInput
      : props.variant === "tool"
        ? ui.canvas.addButtonTool
        : ui.canvas.addButtonPrompt;

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={cn(ui.canvas.addButtonBase, variantClassName)}
    >
      {props.label}
    </button>
  );
}

function WorkflowCanvasFlow(props: {
  nodes: WorkflowNodeData[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: "UP" | "DOWN") => void;
}) {
  return (
    <div className={ui.canvas.center}>
      <div className={ui.canvas.flow}>
        {props.nodes.map((node, index) => {
          const isFirst = index === 0;
          const isLast = index === props.nodes.length - 1;

          return (
            <div key={node.id} className={ui.canvas.nodeWrapper}>
              <div className="relative">
                <WorkflowNodeCard
                  node={node}
                  selected={props.selectedNodeId === node.id}
                  onClick={() => props.onSelectNode(node.id)}
                />

                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <button
                    type="button"
                    title="Move up"
                    disabled={isFirst}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.onMoveNode(node.id, "UP");
                    }}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-950/50 text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    )}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    title="Move down"
                    disabled={isLast}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.onMoveNode(node.id, "DOWN");
                    }}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-950/50 text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {index < props.nodes.length - 1 && (
                <div className={ui.canvas.connector} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkflowCanvasEmptyState() {
  return (
    <div className={ui.canvas.emptyState}>
      <div className={ui.canvas.emptyCard}>
        <h3 className={ui.canvas.emptyTitle}>No nodes yet</h3>

        <p className={ui.canvas.emptyDescription}>
          Add an Input, Tool, or Prompt node to start building this workflow.
        </p>
      </div>
    </div>
  );
}

export default WorkflowCanvas;