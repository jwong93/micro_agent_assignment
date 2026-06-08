import { Trash2 } from "lucide-react";


import { FormInput, FormTextarea } from "./FormField";
import ToolNodeEditor from "./ToolNodeEditor";
import { ui } from "../styles/ui";
import type { InputWorkflowNodeData, PromptWorkflowNodeData, WorkflowNodeData } from "../types/worfklow.type";

type NodeEditorPanelProps = {
  selectedNode: WorkflowNodeData;
  onUpdateNode: (node: WorkflowNodeData) => void;
  onDeleteNode: () => void;
};

function NodeEditorPanel({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
}: NodeEditorPanelProps) {
  function updateBase(field: "name" | "description", value: string) {
    onUpdateNode({
      ...selectedNode,
      [field]: value,
    });
  }

  return (
    <section className={ui.panel.padded}>
      <p className={ui.panel.eyebrow}>Selected Node</p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-lg font-semibold">
          {selectedNode.name}
        </h2>

        <button
          onClick={onDeleteNode}
          className={ui.button.iconDanger}
          title="Delete node"
          type="button"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className={ui.form.stack}>
        <FormInput
          label="Title"
          value={selectedNode.name}
          onChange={(value) => updateBase("name", value)}
        />

        <FormTextarea
          label="Description"
          value={selectedNode.description}
          onChange={(value) => updateBase("description", value)}
        />

        {selectedNode.nodeType === "INPUT" && (
          <InputNodeEditor node={selectedNode} onUpdateNode={onUpdateNode} />
        )}

        {selectedNode.nodeType === "TOOL" && (
          <ToolNodeEditor node={selectedNode} onUpdateNode={onUpdateNode} />
        )}

        {selectedNode.nodeType === "PROMPT" && (
          <PromptNodeEditor node={selectedNode} onUpdateNode={onUpdateNode} />
        )}
      </div>
    </section>
  );
}
type InputNodeEditorProps = {
  node: InputWorkflowNodeData;
  onUpdateNode: (node: WorkflowNodeData) => void;
};

function InputNodeEditor({ node, onUpdateNode }: InputNodeEditorProps) {
  return (
    <>
      <FormInput
        label="Variable Name"
        value={node.config.variableName}
        onChange={(value) =>
          onUpdateNode({
            ...node,
            config: {
              ...node.config,
              variableName: value,
            },
          })
        }
      />

      <FormTextarea
        label="Value"
        value={node.config.value}
        minHeight="min-h-24"
        onChange={(value) =>
          onUpdateNode({
            ...node,
            config: {
              ...node.config,
              value,
            },
          })
        }
      />
    </>
  );
}

type PromptNodeEditorProps = {
  node: PromptWorkflowNodeData;
  onUpdateNode: (node: WorkflowNodeData) => void;
};

function PromptNodeEditor({ node, onUpdateNode }: PromptNodeEditorProps) {
  return (
    <>
      <FormTextarea
        label="Prompt"
        value={node.config.prompt}
        code
        minHeight="min-h-40"
        onChange={(value) =>
          onUpdateNode({
            ...node,
            config: {
              ...node.config,
              prompt: value,
            },
          })
        }
      />

      <FormInput
        label="Output Variable"
        value={node.config.outputVariable}
        onChange={(value) =>
          onUpdateNode({
            ...node,
            config: {
              ...node.config,
              outputVariable: value,
            },
          })
        }
      />
    </>
  );
}

export default NodeEditorPanel;