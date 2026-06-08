import { Brain, Database, FileText } from "lucide-react";
import { cn } from "../lib/cn";
import { ui } from "../styles/ui";
import type { NodeType, WorkflowNodeData } from "../types/worfklow.type";



function getNodeIcon(type: NodeType) {
  if (type === "INPUT") return FileText;
  if (type === "TOOL") return Database;
  return Brain;
}

function getNodeStyle(type: NodeType) {
  if (type === "INPUT") return ui.nodeCard.styles.input;
  if (type === "TOOL") return ui.nodeCard.styles.tool;
  return ui.nodeCard.styles.prompt;
}

type WorkflowNodeCardProps = {
  node: WorkflowNodeData;
  selected: boolean;
  onClick: () => void;
};

function WorkflowNodeCard({
  node,
  selected,
  onClick,
}: WorkflowNodeCardProps) {
  const Icon = getNodeIcon(node.nodeType);
  const style = getNodeStyle(node.nodeType);

  return (
    <button
      onClick={onClick}
      className={cn(
        ui.nodeCard.base,
        style.bg,
        style.border,
        selected && ui.nodeCard.selected
      )}
    >
      <div className={ui.nodeCard.top}>
        <div className={cn(ui.nodeCard.icon, style.text)}>
          <Icon className="h-5 w-5" />
        </div>

      </div>

      <p className={cn(ui.nodeCard.typeLabel, style.text)}>{style.label}</p>

      <h3 className={ui.nodeCard.title}>{node.name}</h3>

      <p className={ui.nodeCard.description}>{node.description}</p>
    </button>
  );
}

export default WorkflowNodeCard;