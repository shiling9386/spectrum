import { StackedBarChart } from "./StackedBarChart";
import styles from "./index.module.scss";

export const SummaryVisuals = () => {
  return (
    <div className={styles.container}>
      <StackedBarChart />
      <StackedBarChart />
      <StackedBarChart />
    </div>
  );
};
