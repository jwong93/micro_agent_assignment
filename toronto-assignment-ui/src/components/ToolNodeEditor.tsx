import { useEffect, useState } from "react";
import { Edit3, Plus } from "lucide-react";

import { FormInput, FormTextarea } from "./FormField";
import ToolModal from "./ToolModal";
import AppButton from "./common/AppButton";

import { fetchTools, type ToolNode } from "../services/toolNodeApi";
import { cn } from "../lib/cn";
import { ui } from "../styles/ui";
import type {
  ToolWorkflowNodeData,
  WorkflowNodeData,
} from "../types/worfklow.type";

type ToolNodeEditorProps = {
  node: ToolWorkflowNodeData;
  onUpdateNode: (node: WorkflowNodeData) => void;
};

function ToolNodeEditor({ node, onUpdateNode }: ToolNodeEditorProps) {
  const [tools, setTools] = useState<ToolNode[]>([]);
  const [loadingTools, setLoadingTools] = useState(false);
  const [toolError, setToolError] = useState("");

  const [createToolOpen, setCreateToolOpen] = useState(false);
  const [editToolOpen, setEditToolOpen] = useState(false);

  const [inputMappingText, setInputMappingText] = useState(
    JSON.stringify(node.config.inputMapping, null, 2)
  );

  const [inputMappingError, setInputMappingError] = useState("");

  useEffect(() => {
    setInputMappingText(JSON.stringify(node.config.inputMapping, null, 2));
    setInputMappingError("");
  }, [node.id]);

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    try {
      setLoadingTools(true);
      setToolError("");

      const data = await fetchTools();

      setTools(data);
    } catch (error) {
      setToolError(
        error instanceof Error ? error.message : "Failed to load tools"
      );
    } finally {
      setLoadingTools(false);
    }
  }

  const selectedTool = tools.find((tool) => tool.code === node.config.toolCode);

  function updateToolCode(toolCode: string) {
    onUpdateNode({
      ...node,
      config: {
        ...node.config,
        toolCode,
      },
    });
  }

  function handleToolSaved(tool: ToolNode) {
    setTools((current) => {
      const exists = current.some((currentTool) => currentTool.id === tool.id);

      if (exists) {
        return current.map((currentTool) =>
          currentTool.id === tool.id ? tool : currentTool
        );
      }

      return [...current, tool];
    });

    updateToolCode(tool.code);
  }

  return (
    <>
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <label className={ui.form.label}>Tool</label>
            <p className="mt-1 text-xs text-slate-500">
              Select, create, or edit a backend tool.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AppButton
              className={`${ui.button.secondary} h-9 px-3 text-xs`}
              onClick={() => setCreateToolOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Create
            </AppButton>

            <AppButton
              className={`${ui.button.secondary} h-9 px-3 text-xs`}
              onClick={() => setEditToolOpen(true)}
              disabled={!selectedTool}
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit
            </AppButton>
          </div>
        </div>

        <select
          value={node.config.toolCode}
          onChange={(event) => updateToolCode(event.target.value)}
          className={cn(ui.form.field, ui.form.input)}
        >
          <option value="">
            {loadingTools ? "Loading tools..." : "Select a tool"}
          </option>

          {tools.map((tool) => (
            <option key={tool.id} value={tool.code}>
              {tool.code}
            </option>
          ))}
        </select>

        {toolError && (
          <p className="mt-2 text-xs text-rose-300">{toolError}</p>
        )}

        {selectedTool && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs font-medium text-slate-300">
              {selectedTool.description}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Code: {selectedTool.code}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Kind: {selectedTool.toolType}
            </p>
          </div>
        )}
      </div>

      <FormTextarea
        label="Input Mapping JSON"
        value={inputMappingText}
        code
        minHeight="min-h-28"
        onChange={(value) => {
          setInputMappingText(value);

          try {
            const parsed = JSON.parse(value);

            setInputMappingError("");

            onUpdateNode({
              ...node,
              config: {
                ...node.config,
                inputMapping: parsed,
              },
            });
          } catch {
            setInputMappingError("Invalid JSON. Fix it before saving.");
          }
        }}
      />

      {inputMappingError && (
        <p className="mt-2 text-xs text-rose-300">{inputMappingError}</p>
      )}

      <FormInput
        label="Output Variable"
        value={node.config.outputVariable ?? ""}
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

      <ToolModal
        open={createToolOpen}
        onClose={() => setCreateToolOpen(false)}
        onCreated={handleToolSaved}
        mode="create"
      />

      <ToolModal
        open={editToolOpen}
        onClose={() => setEditToolOpen(false)}
        onCreated={handleToolSaved}
        mode="edit"
        tool={selectedTool}
      />
    </>
  );
}

export default ToolNodeEditor;