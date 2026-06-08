import { Plus, Workflow as WorkflowIcon } from "lucide-react";
import  { cn } from "../lib/cn";
import  { ui } from "../styles/ui";
import type { Workflow } from "../types/worfklow.type";



type WorkflowListProps = {
  workflows: Workflow[];
  selectedWorkflowId: string;
  onSelectWorkflow: (workflowId: string) => void;
  onAddWorkflow: ()=> void;
};

function WorkflowList({
  workflows,
  selectedWorkflowId,
  onSelectWorkflow,
  onAddWorkflow
}: WorkflowListProps) {
  return (
    <aside className={ui.panel.padded}>
      <WorkflowListHeader onAddWorkflow={onAddWorkflow}/>

      <div className={ui.workflowList.list}>
        {workflows.map((workflow) => (
          <WorkflowListItem
            key={workflow.id}
            workflow={workflow}
            active={workflow.id === selectedWorkflowId}
            onClick={() => onSelectWorkflow(workflow.id)}
          />
        ))}
      </div>
    </aside>
  );
}

type WorkflowListHeaderProps = {
  onAddWorkflow: () => void
};

function WorkflowListHeader({
  onAddWorkflow
}: WorkflowListHeaderProps) {
  return (
    <div className={ui.workflowList.header}>
      <div>
        <h2 className={ui.panel.headerTitle}>Workflows</h2>
        <p className={ui.panel.headerDescription}>
          Select a workflow to edit.
        </p>
      </div>

      <button
        className={ui.workflowList.addButton}
        type="button"
        title="Create workflow"
        onClick={onAddWorkflow}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function WorkflowListItem(props: {
  workflow: Workflow;
  active: boolean;
  onClick: () => void;
}) {
  const { workflow, active, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        ui.workflowList.item,
        active ? ui.workflowList.itemActive : ui.workflowList.itemInactive
      )}
      type="button"
    >
      <div className={ui.workflowList.itemHeader}>
        <WorkflowListItemIcon active={active} />

        <div className={ui.workflowList.content}>
          <h3 className={ui.workflowList.title}>{workflow.name}</h3>

          <p className={ui.workflowList.meta}>
            {workflow.nodes.length} nodes
          </p>
        </div>
      </div>

      <p className={ui.workflowList.description}>{workflow.description}</p>
    </button>
  );
}

function WorkflowListItemIcon(props: { active: boolean }) {
  return (
    <div
      className={cn(
        ui.workflowList.icon,
        props.active
          ? ui.workflowList.iconActive
          : ui.workflowList.iconInactive
      )}
    >
      <WorkflowIcon className="h-5 w-5" />
    </div>
  );
}

export default WorkflowList;