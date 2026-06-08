import  { ui } from "../styles/ui";
import type { OverviewItem } from "../utils/workflowOverview.utils";


type OverviewCardProps = {
  item: OverviewItem;
};

function OverviewCard({ item }: OverviewCardProps) {
  const Icon = item.icon;

  return (
    <article className={ui.overview.card}>
      <div className={ui.overview.icon}>
        <Icon className="h-5 w-5" />
      </div>

      <p className={ui.overview.label}>{item.label}</p>

      <h3 className={ui.overview.value}>{item.value}</h3>

      <p className={ui.overview.description}>{item.description}</p>
    </article>
  );
}

export default OverviewCard;