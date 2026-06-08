export type ToolType =
  | "DB_TOOL"
  | "API_TOOL"
  | "CSV_TOOL";


const API_BASE_URL = "/api";

export type CreateToolRequest = {
  code: string;
  name: string;
  description: string;
  toolType: ToolType;
  configJson: string;
  inputSchemaJson: string;
  outputSchemaJson: string;
};

export type ToolNode = CreateToolRequest & {
  id: string;
};

export async function fetchTools(): Promise<ToolNode[]> {
  const response = await fetch(`${API_BASE_URL}/tools`, );

  if (!response.ok) {
    throw new Error("Failed to fetch tools");
  }

  const data = (await response.json()) as ToolNode[];

  return data;
}

export async function createTool(request: CreateToolRequest): Promise<ToolNode> {
    const response = await fetch(`${API_BASE_URL}/tools`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    });

    if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? "Failed to create tool");
    }

    const data = (await response.json()) as ToolNode;
    return data
}

export async function updateTool(toolId:string, request: CreateToolRequest): Promise<ToolNode> {
    const response = await fetch(`${API_BASE_URL}/tools/update/${toolId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    });

    if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? "Failed to update tool");
    }

    const data = (await response.json()) as ToolNode;
    return data
}