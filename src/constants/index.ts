import { BookmarkType } from "@prisma/client";

export const BOOKMARK_COLORS = {
  WORD: {
    color: "rgba(34, 166, 153)",
    bgColor: "rgba(34, 166, 153, 0.2)",
  },
  TERMINOLOGY: {
    color: "rgba(255, 228, 167)",
    bgColor: "rgba(255, 228, 167, 0.2)",
  },
  SLANG: {
    color: "rgba(255, 158, 170)",
    bgColor: "rgba(255, 158, 170, 0.2)",
  },
  PROVERB: {
    color: "rgba(242, 151, 39)",
    bgColor: "rgba(242, 151, 39, 0.2)",
  },
} satisfies Record<
  BookmarkType,
  {
    color: string;
    bgColor: string;
  }
>;
