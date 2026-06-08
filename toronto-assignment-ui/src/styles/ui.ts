export const ui = {
  page: {
    shell: "min-h-screen bg-slate-950 text-slate-50",
    background:
      "fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.18),transparent_34%)]",
    layout: "relative min-h-screen",
    main: "min-w-0 p-6",
    builderGrid:
      "grid h-[calc(100vh-150px)] grid-cols-[240px_minmax(0,1fr)_360px] gap-4",
    rightColumn: "flex min-h-0 flex-col gap-4",
  },

  button: {
    secondary:
      "inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-slate-200 transition hover:bg-white/10",

    primary:
      "inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:from-blue-400 hover:to-violet-500",

    danger:
      "inline-flex h-10 items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 text-sm text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200",

    ghost:
      "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-100",

    iconDanger:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200",
  },

  panel: {
    base: "rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/20",
    padded:
      "rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20",
    headerTitle: "text-base font-semibold",
    headerDescription: "mt-1 text-sm text-slate-400",
    eyebrow:
      "text-xs font-semibold uppercase tracking-[0.2em] text-blue-300",
  },

  sidebar: {
    shell:
      "border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl",
    brand: "mb-8 flex items-center gap-3",
    brandIcon:
      "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/30",
    nav: "space-y-1",
    item:
      "flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition",
    itemActive: "bg-blue-500/15 text-blue-100",
    itemInactive: "text-slate-400 hover:bg-white/5 hover:text-slate-100",
    datasetCard:
      "mt-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-4",
  },

  topbar: {
    shell: "mb-5 flex items-start justify-between gap-6",
    breadcrumb: "mb-2 text-sm text-blue-300",
    titleRow: "flex items-center gap-3",
    title: "text-3xl font-semibold tracking-tight",
    description: "mt-2 max-w-3xl text-sm leading-6 text-slate-400",
    actions: "flex items-center gap-2",
    saveMessage:
      "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200",
  },

  palette: {
    card:
      "group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-400/40 hover:bg-blue-500/10",
    icon:
      "flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200",
    plus:
      "flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition group-hover:bg-blue-500/20 group-hover:text-blue-200",
    title: "text-sm font-medium text-slate-100",
    description: "mt-1 text-xs leading-5 text-slate-400",
  },

  nodeCard: {
    base:
      "w-80 rounded-2xl border bg-gradient-to-br p-4 text-left shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-300/60",
    selected: "ring-2 ring-blue-400/70",
    top: "mb-3 flex items-center justify-between",
    icon: "flex h-11 w-11 items-center justify-center rounded-xl bg-white/10",
    ready:
      "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-200",
    typeLabel: "text-xs font-semibold uppercase tracking-[0.18em]",
    title: "mt-1 text-base font-semibold text-white",
    description: "mt-2 text-xs leading-5 text-slate-400",
    styles: {
      input: {
        label: "Input",
        border: "border-sky-400/30",
        bg: "from-sky-500/20 to-blue-500/5",
        text: "text-sky-300",
      },
      tool: {
        label: "Tool",
        border: "border-emerald-400/30",
        bg: "from-emerald-500/20 to-teal-500/5",
        text: "text-emerald-300",
      },
      prompt: {
        label: "Prompt",
        border: "border-violet-400/30",
        bg: "from-violet-500/20 to-fuchsia-500/5",
        text: "text-violet-300",
      },
    },
  },

  form: {
    stack: "mt-5 space-y-4",
    label: "mb-2 block text-xs font-medium text-slate-400",
    field:
      "w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20",
    input: "h-10",
    textarea: "resize-none py-2",
    codeTextarea: "font-mono text-xs text-blue-100",
  },

  empty: {
    panel:
      "rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20",
    result:
      "mt-5 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center text-slate-400",
  },
    workflowList: {
    header: "mb-5 flex items-start justify-between gap-3",
    addButton:
      "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10",

    list: "space-y-3",

    item:
      "w-full rounded-2xl border p-4 text-left transition",
    itemActive:
      "border-blue-400/40 bg-blue-500/15",
    itemInactive:
      "border-white/10 bg-white/[0.03] hover:border-blue-400/30 hover:bg-blue-500/10",

    itemHeader: "mb-3 flex items-center gap-3",

    icon:
      "flex h-10 w-10 items-center justify-center rounded-xl",
    iconActive:
      "bg-blue-500/20 text-blue-200",
    iconInactive:
      "bg-white/10 text-slate-300",

    content: "min-w-0",
    title: "truncate text-sm font-semibold text-slate-100",
    meta: "text-xs text-slate-400",
    description: "line-clamp-2 text-xs leading-5 text-slate-400",
},
overview: {
  grid: "mb-4 grid grid-cols-4 gap-4",

  card:
    "rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20",

  icon:
    "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200",

  label:
    "text-xs font-medium uppercase tracking-[0.16em] text-slate-500",

  value:
    "mt-1 text-2xl font-semibold text-white",

  description:
    "mt-1 text-xs text-slate-400",
},
canvas: {
  shell:
    "relative overflow-auto rounded-3xl border border-white/10 bg-slate-900/70 bg-[radial-gradient(circle,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:24px_24px] p-6 shadow-2xl shadow-black/20",

  floatingHeader:
    "absolute left-5 top-5 z-10 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl",

  title: "text-sm font-semibold",
  description: "text-xs text-slate-400",

  addButtonRow: "mt-3 flex gap-2",

  addButtonBase: "rounded-lg px-2 py-1 text-xs transition",

  addButtonInput: "bg-sky-500/15 text-sky-200 hover:bg-sky-500/25",

  addButtonTool:
    "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25",

  addButtonPrompt:
    "bg-violet-500/15 text-violet-200 hover:bg-violet-500/25",

  center: "flex min-h-full items-center justify-center py-16",

  flow: "flex flex-col items-center",

  nodeWrapper: "flex flex-col items-center",

  connector:
    "h-12 w-px bg-gradient-to-b from-blue-400/60 to-violet-400/60",

  emptyState: "flex min-h-full items-center justify-center text-center",

  emptyCard:
    "rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8",

  emptyTitle: "text-base font-semibold text-slate-100",

  emptyDescription: "mt-2 max-w-sm text-sm leading-6 text-slate-400",
},
toolEditor: {
  section: "space-y-5",

  card:
    "rounded-2xl border border-white/10 bg-white/[0.03] p-4",

  header:
    "mb-3 flex items-center justify-between gap-3",

  helperText:
    "mt-1 text-xs leading-5 text-slate-500",

  iconBox:
    "flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300",

  select:
    "cursor-pointer appearance-none bg-slate-950/70 pr-10 text-slate-100 outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20",

  errorBox:
    "mt-3 flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 p-3 text-xs text-rose-300",

  selectedToolCard:
    "mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-4",

  selectedToolContent:
    "flex items-start gap-3",

  selectedToolIcon:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300",

  selectedToolBody:
    "min-w-0",

  selectedToolName:
    "text-sm font-semibold text-slate-100",

  selectedToolDescription:
    "mt-1 text-xs leading-5 text-slate-400",

  badgeRow:
    "mt-3 flex flex-wrap gap-2",

  codeBadge:
    "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300",

  kindBadge:
    "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300",
},

modal: {
  overlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm",

  panel:
    "w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40",

  header:
    "flex items-start justify-between gap-4",

  title:
    "text-lg font-semibold text-slate-100",

  description:
    "mt-1 text-sm text-slate-400",

  body:
    "mt-5 space-y-4",

  footer:
    "mt-6 flex items-center justify-end gap-3",

  closeButton:
    "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white",
},

toolModal: {
  grid:
    "grid grid-cols-1 gap-4 md:grid-cols-2",

  full:
    "md:col-span-2",

  hint:
    "mt-2 rounded-2xl border border-blue-400/15 bg-blue-500/10 p-3 text-xs leading-5 text-blue-200",
},
runResult: {
  shell: "rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20",

  emptyBox:
    "mt-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4",

  emptyText:
    "text-sm text-slate-400",

  runningBox:
    "mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4",

  runningText:
    "text-sm text-blue-200",

  content:
    "mt-4 space-y-4",

  statusBox:
    "rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3",

  label:
    "text-xs uppercase tracking-[0.16em] text-slate-500",

  statusLabel:
    "text-xs uppercase tracking-[0.16em] text-emerald-300",

  statusText:
    "mt-1 text-sm font-semibold text-emerald-200",

  logsList:
    "mt-2 space-y-2",

  logCard:
    "rounded-2xl border border-white/10 bg-white/[0.03] p-3",

  logHeader:
    "flex items-center justify-between gap-3",

  logTitle:
    "text-sm font-medium text-slate-100",

  logStatus:
    "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300",

  logType:
    "mt-1 text-xs text-slate-500",

  outputBox:
    "mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-xs leading-5 text-slate-200",
},

};