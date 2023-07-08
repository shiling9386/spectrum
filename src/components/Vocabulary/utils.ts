import { WeeklyChartProps } from "@/components/Vocabulary/Chart/WeeklyChart";
import { BookmarkSelect } from "../../service/useDataService";
import { DateTime } from "luxon";

export const getCountForLastSevenDays = (bookmarks: BookmarkSelect[]): WeeklyChartProps["data"] => {
  const dateIndex: Map<string, number> = new Map();
  const result: WeeklyChartProps["data"] = [];
  const dateTimeNow = DateTime.now();
  for (let offset = 0; offset < 7; offset++) {
    const date = dateTimeNow
      .minus({
        days: offset,
      })
      .toFormat("dd LLL");
    dateIndex.set(date, offset);
    result.push({
      date,
      count: 0,
    });
  }

  for (const bookmark of bookmarks) {
    const bookmarkDate = DateTime.fromISO(bookmark.createdAt).toFormat("dd LLL");
    if (dateIndex.has(bookmarkDate)) {
      const index = dateIndex.get(bookmarkDate);
      if (index !== undefined) {
        result[index].count++;
      }
    }
  }
  return result.reverse();
};
