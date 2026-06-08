import { Play, Save } from "lucide-react";

import type { Workflow } from "../types/worfklow.type";
import { ui } from "../styles/ui";
import AppButton from "./common/AppButton";
import { FormInput, FormTextarea } from "./FormField";

type TopbarProps = {
  workflow: Workflow;
  onRun: () => void;
  onSave: () => void;
  onUpdateWorkflow: (
    values: Partial<Pick<Workflow, "name" | "description">>
  ) => void;
  saving: boolean;
  running: boolean;
};

function Topbar({
  workflow,
  onRun,
  onSave,
  onUpdateWorkflow,
  saving,
  running
}: TopbarProps) {
  return (
    <header className={ui.topbar.shell}>
      <div className="w-full max-w-2xl space-y-4">
        <p className={ui.topbar.breadcrumb}>Workflows / {workflow.name}</p>

        <FormInput
          label="Workflow Name"
          value={workflow.name}
          onChange={(value) => onUpdateWorkflow({ name: value })}
        />

        <FormTextarea
          label="Workflow Description"
          value={workflow.description}
          minHeight="min-h-20"
          onChange={(value) => onUpdateWorkflow({ description: value })}
        />
      </div>

      <div className={ui.topbar.actions}>

         <AppButton
          className={ui.button.secondary}
          onClick={onSave}
          disabled={saving || running}
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </AppButton>

        <AppButton
          className={ui.button.primary}
          onClick={onRun}
          disabled={saving || running}
        >
          <Play className="h-4 w-4" />
          {running ? "Running..." : "Run"}
        </AppButton>
      </div>
    </header>
  );
}

export default Topbar;