
import type { PromptWorkflowNodeData, WorkflowNodeData } from "../types/worfklow.type";
import { FormInput, FormTextarea } from "./FormField";

type PromptNodeEditorProps = {
  node: PromptWorkflowNodeData;
  onUpdateNode: (node: WorkflowNodeData) => void;
};

function PromptNodeEditor({ node, onUpdateNode }: PromptNodeEditorProps) {
  return (
    <>
      <FormTextarea
        label="Prompt Template"
        value={node.config.prompt}
        minHeight="min-h-36"
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

export default PromptNodeEditor;