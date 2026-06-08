import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import { FormInput, FormTextarea } from "./FormField";
import {
  type ToolNode,
  type CreateToolRequest,
  createTool,
  updateTool,
  type ToolType,
} from "../services/toolNodeApi";
import { ui } from "../styles/ui";
import AppButton from "./common/AppButton";

type ToolModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (tool: ToolNode) => void;
  mode?: "create" | "edit";
  tool?: ToolNode | null;
};

const toolTypeOptions: ToolType[] = ["DB_TOOL", "API_TOOL", "CSV_TOOL"];

function ToolModal({
  open,
  onClose,
  onCreated,
  mode = "create",
  tool = null,
}: ToolModalProps) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toolType, setToolType] = useState<ToolType>("DB_TOOL");
  const [configJson, setConfigJson] = useState(defaultConfigFor("DB_TOOL"));
  const [inputSchemaJson, setInputSchemaJson] = useState("{}");
  const [outputSchemaJson, setOutputSchemaJson] = useState("{}");

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === "edit" && tool) {
      setCode(tool.code);
      setName(tool.name);
      setDescription(tool.description ?? "");
      setToolType(tool.toolType);
      setConfigJson(prettyJson(tool.configJson || "{}"));
      setInputSchemaJson(prettyJson(tool.inputSchemaJson || "{}"));
      setOutputSchemaJson(prettyJson(tool.outputSchemaJson || "{}"));
      setErrorMessage("");
      return;
    }

    resetForm();
  }, [open, mode, tool]);

  const configHint = useMemo(() => {
    if (toolType === "DB_TOOL") {
      return `DB tool config example: {"sql":"SELECT * FROM transport_delay_records WHERE LOWER(station_name) = LOWER(:stationName)"}`;
    }

    if (toolType === "API_TOOL") {
      return `API tool config example: {"method":"GET","url":"https://jsonplaceholder.typicode.com/users/{userId}","headers":{}}`;
    }

    return `CSV tool config example: {"fileName":"transport_delay_records.csv"}`;
  }, [toolType]);

  if (!open) {
    return null;
  }

  function handleToolKindChange(nextToolKind: ToolType) {
    setToolType(nextToolKind);

    if (mode === "create") {
      setConfigJson(defaultConfigFor(nextToolKind));
    }
  }

  async function handleSubmit() {
    try {
      setSaving(true);
      setErrorMessage("");

      validateRequired(code, "Tool Code");
      validateRequired(name, "Tool Name");

      validateJson(configJson, "Config JSON");
      validateJson(inputSchemaJson || "{}", "Input Schema JSON");
      validateJson(outputSchemaJson || "{}", "Output Schema JSON");

      const request: CreateToolRequest = {
        code: code.trim(),
        name: name.trim(),
        description: description.trim(),
        toolType,
        configJson: normalizeJson(configJson),
        inputSchemaJson: normalizeJson(inputSchemaJson || "{}"),
        outputSchemaJson: normalizeJson(outputSchemaJson || "{}"),
      };

      const createdTool =
        mode === "edit" && tool
          ? await updateTool(tool.id, request)
          : await createTool(request);

      onCreated(createdTool);
      onClose();

      if (mode === "create") {
        resetForm();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save tool"
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setCode("");
    setName("");
    setDescription("");
    setToolType("DB_TOOL");
    setConfigJson(defaultConfigFor("DB_TOOL"));
    setInputSchemaJson("{}");
    setOutputSchemaJson("{}");
    setErrorMessage("");
  }

  return (
    <div className={ui.modal.overlay}>
      <div className={ui.modal.panel}>
        <div className={ui.modal.header}>
          <div>
            <h2 className={ui.modal.title}>
              {mode === "edit" ? "Edit Tool" : "Create Tool"}
            </h2>
            <p className={ui.modal.description}>
              {mode === "edit"
                ? "Update an existing tool that workflow tool nodes can execute."
                : "Create a tool that workflow tool nodes can execute."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={ui.modal.closeButton}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className={ui.modal.body}>
          <div className={ui.toolModal.grid}>
            <FormInput label="Tool Code" value={code} onChange={setCode} />

            <FormInput label="Tool Name" value={name} onChange={setName} />

            <div>
              <label className={ui.form.label}>Tool Type</label>

              <select
                value={toolType}
                onChange={(event) =>
                  handleToolKindChange(event.target.value as ToolType)
                }
                className={`${ui.form.field} ${ui.form.input}`}
              >
                {toolTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label="Description"
              value={description}
              onChange={setDescription}
            />

            <div className={ui.toolModal.full}>
              <FormTextarea
                label="Config JSON"
                value={configJson}
                code
                minHeight="min-h-32"
                onChange={setConfigJson}
              />

              <p className={ui.toolModal.hint}>{configHint}</p>
            </div>

            <FormTextarea
              label="Input Schema JSON"
              value={inputSchemaJson}
              code
              minHeight="min-h-24"
              onChange={setInputSchemaJson}
            />

            <FormTextarea
              label="Output Schema JSON"
              value={outputSchemaJson}
              code
              minHeight="min-h-24"
              onChange={setOutputSchemaJson}
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-300">
              {errorMessage}
            </p>
          )}
        </div>

        <div className={ui.modal.footer}>
          <AppButton
            className={ui.button.secondary}
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </AppButton>

          <AppButton
            className={ui.button.primary}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : mode === "edit"
                ? "Save Tool"
                : "Create Tool"}
          </AppButton>
        </div>
      </div>
    </div>
  );
}

function defaultConfigFor(toolType: ToolType) {
  if (toolType === "DB_TOOL") {
    return JSON.stringify(
      {
        sql: "SELECT * FROM transport_delay_records WHERE LOWER(station_name) = LOWER(:stationName)",
      },
      null,
      2
    );
  }

  if (toolType === "API_TOOL") {
    return JSON.stringify(
      {
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users/{userId}",
        headers: {},
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      fileName: "transport_delay_records.csv",
    },
    null,
    2
  );
}

function validateRequired(value: string, label: string) {
  if (!value.trim()) {
    throw new Error(`${label} is required`);
  }
}

function validateJson(value: string, label: string) {
  try {
    JSON.parse(value);
  } catch {
    throw new Error(`${label} is not valid JSON`);
  }
}

function normalizeJson(value: string) {
  return JSON.stringify(JSON.parse(value));
}

function prettyJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

export default ToolModal;