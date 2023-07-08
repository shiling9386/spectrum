import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export interface WeeklyChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

const MARGIN = { top: 5, right: 20, bottom: 5, left: 0 };
export const WeeklyChart = ({ data }: WeeklyChartProps) => (
  <LineChart width={800} height={300} data={data} margin={MARGIN}>
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
  </LineChart>
);
