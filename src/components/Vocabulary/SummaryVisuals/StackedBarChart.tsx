import { BookmarkSummaryStat } from "@/atoms/bookmark";
import { BOOKMARK_COLORS } from "@/constants";
import { BookmarkType } from "@prisma/client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  data: BookmarkSummaryStat[];
}
export const StackedBarChart = ({ data }: Props) => (
  <ResponsiveContainer width="100%" height="90%">
    <BarChart width={500} height={300} data={data} margin={{}}>
      <XAxis dataKey="name" tickSize={0} tickMargin={12} tick={{ fontSize: "small" }} />
      <YAxis allowDecimals={false} tick={{ fontSize: "small" }} tickSize={0} tickMargin={12} />
      <CartesianGrid strokeDasharray="2 3" vertical={false} />
      <Tooltip />
      <Bar dataKey={BookmarkType.WORD} stackId="a" fill={BOOKMARK_COLORS.WORD.color} barSize={38} />
      <Bar dataKey={BookmarkType.SLANG} stackId="a" fill={BOOKMARK_COLORS.SLANG.color} />
      <Bar
        dataKey={BookmarkType.TERMINOLOGY}
        stackId="a"
        fill={BOOKMARK_COLORS.TERMINOLOGY.color}
      />
      <Bar dataKey={BookmarkType.PROVERB} stackId="a" fill={BOOKMARK_COLORS.PROVERB.color} />
    </BarChart>
  </ResponsiveContainer>
);
