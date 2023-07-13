import { selector, selectorFamily } from "recoil";
import { BookmarkSelect } from "@/model";
import { DateTime } from "luxon";
import { bookmarksAtom } from "./atom";
import { BookmarkType } from "@prisma/client";

export const recentBookmarksState = selector<BookmarkSelect[] | undefined>({
  key: "bookmarksState",
  get: ({ get }) => {
    const data = get(bookmarksAtom)?.slice();
    return data?.sort((a, b) =>
      DateTime.fromISO(a.createdAt) < DateTime.fromISO(b.createdAt) ? 1 : -1
    );
  },
});

type INTERVAL = "DAY" | "WEEK" | "MONTH";

export interface BookmarkSummaryStat {
  interval: INTERVAL;
  name: string;
  [BookmarkType.PROVERB]: number;
  [BookmarkType.SLANG]: number;
  [BookmarkType.TERMINOLOGY]: number;
  [BookmarkType.WORD]: number;
}

export const recentBookmarksSummaryStatsState = selectorFamily<
  BookmarkSummaryStat[] | undefined,
  INTERVAL
>({
  key: "recentBookmarksSummaryStatsState",
  get:
    (interval: INTERVAL) =>
    ({ get }) => {
      const allRecentBookmarks = get(recentBookmarksState);
      if (allRecentBookmarks === undefined) {
        return undefined;
      }

      const today_d = DateTime.now().ordinal;
      const today_w = DateTime.now().weekNumber;
      const today_m = DateTime.now().month;

      const dailySummaryStats: BookmarkSummaryStat[] = getEmptySummaryStats("DAY");
      const weeklySummaryStats: BookmarkSummaryStat[] = getEmptySummaryStats("WEEK");
      const monthlySummaryStats: BookmarkSummaryStat[] = getEmptySummaryStats("MONTH");

      for (let bookmark of allRecentBookmarks) {
        const datetime = DateTime.fromISO(bookmark.createdAt);
        const ordinal = datetime.ordinal;
        const weekNumber = datetime.weekNumber;
        const month = datetime.month;

        const dayIndex = today_d - ordinal;
        if (dayIndex < 7) {
          dailySummaryStats[dayIndex][bookmark.type]++;
        }

        const weekIndex = today_w - weekNumber;
        if (weekIndex < 7) {
          weeklySummaryStats[weekIndex][bookmark.type]++;
        }

        const monthIndex = today_m - month;
        if (monthIndex < 7) {
          monthlySummaryStats[monthIndex][bookmark.type]++;
        }
      }
      switch (interval) {
        case "DAY":
          return dailySummaryStats.reverse();
        case "MONTH":
          return monthlySummaryStats.reverse();
        case "WEEK":
          return weeklySummaryStats.reverse();
      }
    },
});

const getEmptySummaryStats = (interval: INTERVAL): BookmarkSummaryStat[] => {
  const getIndexName = (interval: INTERVAL, index: number): string => {
    switch (interval) {
      case "DAY":
        return DateTime.now()
          .minus({
            day: index,
          })
          .toFormat("LLL dd");
      case "WEEK":
        return DateTime.now()
          .minus({
            week: index,
          })
          .startOf("week")
          .toFormat("LLL dd");
      case "MONTH":
        return DateTime.now()
          .minus({
            month: index,
          })
          .startOf("month")
          .toFormat("LLL dd");
    }
  };

  return Array.from({ length: 7 }, (_, index) => ({
    interval,
    name: getIndexName(interval, index),
    [BookmarkType.PROVERB]: 0,
    [BookmarkType.SLANG]: 0,
    [BookmarkType.TERMINOLOGY]: 0,
    [BookmarkType.WORD]: 0,
  }));
};
