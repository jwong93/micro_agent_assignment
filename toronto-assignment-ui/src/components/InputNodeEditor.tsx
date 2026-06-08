
import type { InputWorkflowNodeData, WorkflowNodeData } from "../types/worfklow.type";
import { FormInput, FormTextarea } from "./FormField";

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

export default InputNodeEditor;