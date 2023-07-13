import { BookmarkSummaryStat } from "@/atoms/bookmark";
import { BOOKMARK_COLORS } from "@/constants";
import { BookmarkType } from "@prisma/client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: BookmarkSummaryStat[];
}
export const StackedBarChart = ({ data }: Props) => (
  <ResponsiveContainer width="100%" height="90%">
    <BarChart width={500} height={300} data={data} margin={{}}>
      <XAxis dataKey="name" tickSize={0} tickMargin={12} tick={{ fontSize: "small" }} />
      <YAxis allowDecimals={false} tick={{ fontSize: "small" }} />
      <Tooltip />
      <Bar dataKey={BookmarkType.WORD} stackId="a" fill={BOOKMARK_COLORS.WORD} barSize={38} />
      <Bar dataKey={BookmarkType.SLANG} stackId="b" fill={BOOKMARK_COLORS.SLANG} barSize={38} />
      <Bar
        dataKey={BookmarkType.TERMINOLOGY}
        stackId="c"
        fill={BOOKMARK_COLORS.TERMINOLOGY}
        barSize={38}
      />
      <Bar dataKey={BookmarkType.PROVERB} stackId="d" fill={BOOKMARK_COLORS.PROVERB} barSize={38} />
    </BarChart>
  </ResponsiveContainer>
);
