import {
  BarChart3,
  Bot,
  Database,
  Settings,
  TrainFront,
  Workflow,
  Wrench,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/30">
          <TrainFront className="h-6 w-6 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-tight">Transit AI</h1>
          <p className="text-xs text-slate-400">Micro-Agent Builder</p>
        </div>
      </div>

      <nav className="space-y-1">
        <SidebarItem icon={Workflow} label="Workflow Builder" active />
        <SidebarItem icon={Database} label="Dataset" />
        <SidebarItem icon={Wrench} label="Tools" />
        <SidebarItem icon={Bot} label="Agents" />
        <SidebarItem icon={BarChart3} label="Run History" />
        <SidebarItem icon={Settings} label="Settings" />
      </nav>

      <div className="mt-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
          <TrainFront className="h-5 w-5 text-blue-200" />
        </div>

        <h2 className="text-sm font-semibold text-slate-100">
          Toronto Subway Dataset
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Demo workflow uses mock tools to query delay data and generate an
          analyst summary.
        </p>
      </div>
    </aside>
  );
}

function SidebarItem(props: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  const Icon = props.icon;

  return (
    <button
      className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition ${
        props.active
          ? "bg-blue-500/15 text-blue-100"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {props.label}
    </button>
  );
}

export default Sidebar;