import NodeEditorPanel from "../components/NodeEditorPanel";
import RunResultPanel from "../components/RunResultPanel";
import Topbar from "../components/Topbar";
import WorkflowCanvas from "../components/WorkflowCanvas";
import WorkflowList from "../components/WorkflowList";
import WorkflowOverview from "../components/WorkflowOverview";
import { useWorkflowBuilder } from "../hooks/WorkflowBuilder";
import { ui } from "../styles/ui";

function WorkflowBuilderPage() {
  const {
    workflows,
    selectedWorkflow,
    selectedWorkflowId,
    selectedNode,
    selectedNodeId,

    loading,
    saving,
    running,
    errorMessage,
    saveMessage,
    runResult,

    selectWorkflow,
    setSelectedNodeId,
    updateNode,
    addNode,
    deleteSelectedNode,
    runSelectedWorkflow,
    saveSelectedWorkflow,
    addWorkflow,
    updateWorkflowMetaData,
    moveNode,
  } = useWorkflowBuilder();

  if (loading) {
    return (
      <div className={ui.page.shell}>
        <div className={ui.page.background} />

        <div className={ui.page.layout}>
          <main className={ui.page.main}>
            <section className={ui.panel.padded}>
              <p className={ui.panel.eyebrow}>Workflows</p>
              <h1 className="mt-2 text-xl font-semibold">
                Loading workflows...
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Fetching workflow data from the backend.
              </p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={ui.page.shell}>
      <div className={ui.page.background} />

      <div className={ui.page.layout}>
        <main className={ui.page.main}>
          {selectedWorkflow ? (
            <Topbar
              workflow={selectedWorkflow}
              onRun={runSelectedWorkflow}
              onSave={saveSelectedWorkflow}
              onUpdateWorkflow={updateWorkflowMetaData}
              running={running}
              saving={saving}
            />
          ) : (
            <section className={ui.panel.padded}>
              <p className={ui.panel.eyebrow}>Workflows</p>
              <h1 className="mt-2 text-xl font-semibold">
                No workflow selected
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Click the plus button in the workflow list to create a new
                workflow.
              </p>
            </section>
          )}

          {errorMessage && (
            <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-300">
              {errorMessage}
            </p>
          )}

          {saveMessage && (
            <p className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              {saveMessage}
            </p>
          )}

          {selectedWorkflow && <WorkflowOverview workflow={selectedWorkflow} />}

          <section className={ui.page.builderGrid}>
            <WorkflowList
              workflows={workflows}
              selectedWorkflowId={selectedWorkflowId}
              onSelectWorkflow={selectWorkflow}
              onAddWorkflow={addWorkflow}
            />

            {selectedWorkflow ? (
              <WorkflowCanvas
                nodes={selectedWorkflow.nodes}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
                onAddNode={addNode}
                onMoveNode={moveNode}
              />
            ) : (
              <section className={ui.canvas.shell}>
                <div className={ui.canvas.emptyState}>
                  <div className={ui.canvas.emptyCard}>
                    <h3 className={ui.canvas.emptyTitle}>
                      No workflow yet
                    </h3>

                    <p className={ui.canvas.emptyDescription}>
                      Create a workflow from the left panel to start adding
                      Input, Tool, and Prompt nodes.
                    </p>

                    <button
                      type="button"
                      onClick={addWorkflow}
                      className={`${ui.button.primary} mt-4`}
                    >
                      Create Workflow
                    </button>
                  </div>
                </div>
              </section>
            )}

            <aside className={ui.page.rightColumn}>
              {selectedWorkflow && selectedNode ? (
                <NodeEditorPanel
                  key={`${selectedWorkflow.id}-${selectedNode.id}`}
                  selectedNode={selectedNode}
                  onUpdateNode={updateNode}
                  onDeleteNode={deleteSelectedNode}
                />
              ) : (
                <section className={ui.empty.panel}>
                  <p className={ui.panel.eyebrow}>Selected Node</p>

                  <h2 className="mt-2 text-lg font-semibold">
                    No node selected
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Create or select a workflow, then add a node to edit it.
                  </p>
                </section>
              )}

              <RunResultPanel result={runResult} running={running} />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default WorkflowBuilderPage;