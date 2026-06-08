import { ui } from "../styles/ui";
import type { Workflow } from "../types/worfklow.type";
import { buildWorkflowOverviewItems } from "../utils/workflowOverview.utils";
import OverviewCard from "./OverviewCard";


type WorkflowOverviewProps = {
  workflow: Workflow;
};

function WorkflowOverview({ workflow }: WorkflowOverviewProps) {
  const overviewItems = buildWorkflowOverviewItems(workflow);

  return (
    <section className={ui.overview.grid}>
      {overviewItems.map((item) => (
        <OverviewCard key={item.id} item={item} />
      ))}
    </section>
  );
}

export default WorkflowOverview;