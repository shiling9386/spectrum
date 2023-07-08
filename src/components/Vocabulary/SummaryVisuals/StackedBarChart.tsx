import { BOOKMARK_COLORS } from "@/constants";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Jun 7",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jun 6",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Jun 5",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Jun 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Jun 3",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const StackedBarChart = () => (
  <ResponsiveContainer width="100%" height="90%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" tickSize={0} tickMargin={12} tick={{ fontSize: "small" }} />
      <YAxis allowDecimals={false} tick={{ fontSize: "small" }} />
      <Tooltip />
      <Bar dataKey="pv" stackId="a" fill={BOOKMARK_COLORS.WORD} barSize={38} />
      <Bar dataKey="uv" stackId="a" fill={BOOKMARK_COLORS.TERMINOLOGY} barSize={38} />
    </BarChart>
  </ResponsiveContainer>
);
