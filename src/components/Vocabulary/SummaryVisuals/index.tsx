import { useRecoilValue } from "recoil";
import { StackedBarChart } from "./StackedBarChart";
import styles from "./index.module.scss";
import { recentBookmarksSummaryStatsState } from "@/atoms/bookmark";

export const SummaryVisuals = () => {
  const dailySummaryStats = useRecoilValue(recentBookmarksSummaryStatsState("DAY"));
  const weeklySummaryStats = useRecoilValue(recentBookmarksSummaryStatsState("WEEK"));
  const monthlySummaryStats = useRecoilValue(recentBookmarksSummaryStatsState("MONTH"));
  return (
    <div className={styles.container}>
      {dailySummaryStats && <StackedBarChart data={dailySummaryStats} />}
      {weeklySummaryStats && <StackedBarChart data={weeklySummaryStats} />}
      {monthlySummaryStats && <StackedBarChart data={monthlySummaryStats} />}
    </div>
  );
};
