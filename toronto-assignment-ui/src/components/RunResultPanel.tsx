import type { WorkflowRunResult } from "../types/worfklow.type";
import { ui } from "../styles/ui";

type RunResultPanelProps = {
  result: WorkflowRunResult | null;
  running: boolean;
};

function RunResultPanel({ result, running }: RunResultPanelProps) {
  return (
    <section className={ui.runResult.shell}>
      <p className={ui.panel.eyebrow}>Execution</p>
      <h2 className="mt-2 text-lg font-semibold">Run Result</h2>

      {running && (
        <div className={ui.runResult.runningBox}>
          <p className={ui.runResult.runningText}>Running workflow...</p>
        </div>
      )}

      {!running && !result && (
        <div className={ui.runResult.emptyBox}>
          <p className={ui.runResult.emptyText}>
            Click Run to execute the selected workflow.
          </p>
        </div>
      )}

      {result && (
        <div className={ui.runResult.content}>
          <div className={ui.runResult.statusBox}>
            <p className={ui.runResult.statusLabel}>Status</p>
            <p className={ui.runResult.statusText}>{result.status}</p>
          </div>

          <div>
            <p className={ui.runResult.label}>Logs</p>

            <div className={ui.runResult.logsList}>
              {result.logs.map((log) => (
                <div
                  key={`${log.nodeId}-${log.nodeName}`}
                  className={ui.runResult.logCard}
                >
                  <div className={ui.runResult.logHeader}>
                    <p className={ui.runResult.logTitle}>{log.nodeName}</p>
                    <span className={ui.runResult.logStatus}>
                      {log.status}
                    </span>
                  </div>

                  <p className={ui.runResult.logType}>{log.nodeType}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={ui.runResult.label}>Final Output</p>

            <pre className={ui.runResult.outputBox}>
              {typeof result.finalOutput === "string"
                ? result.finalOutput
                : JSON.stringify(result.finalOutput, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

export default RunResultPanel;