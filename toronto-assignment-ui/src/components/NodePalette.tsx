import { Brain, Database, FileText, Plus } from "lucide-react";
import type { NodeType } from "../types/worfklow.type";

type NodePaletteProps = {
  onAddNode: (type: NodeType) => void;
};

function NodePalette({ onAddNode }: NodePaletteProps) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20">
      <div className="mb-5">
        <h2 className="text-base font-semibold">Node Palette</h2>
        <p className="mt-1 text-sm text-slate-400">Add micro-agent steps.</p>
      </div>

      <div className="space-y-3">
        <PaletteCard
          icon={FileText}
          title="Input Node"
          description="Capture user question."
          onClick={() => onAddNode("INPUT")}
        />

        <PaletteCard
          icon={Database}
          title="Tool Node"
          description="Query or calculate data."
          onClick={() => onAddNode("TOOL")}
        />

        <PaletteCard
          icon={Brain}
          title="Prompt Node"
          description="Generate final answer."
          onClick={() => onAddNode("PROMPT")}
        />
      </div>
    </aside>
  );
}

function PaletteCard(props: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  const Icon = props.icon;

  return (
    <button
      onClick={props.onClick}
      className="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-400/40 hover:bg-blue-500/10"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition group-hover:bg-blue-500/20 group-hover:text-blue-200">
          <Plus className="h-4 w-4" />
        </div>
      </div>

      <h3 className="text-sm font-medium text-slate-100">{props.title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-400">
        {props.description}
      </p>
    </button>
  );
}

export default NodePalette;