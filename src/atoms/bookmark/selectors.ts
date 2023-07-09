import { selector } from "recoil";
import { BookmarkSelect } from "@/model";
import { DateTime } from "luxon";
import { bookmarksAtom } from "./atom";

export const recentBookmarksState = selector<BookmarkSelect[] | undefined>({
  key: "bookmarksState",
  get: ({ get }) => {
    const data = get(bookmarksAtom)?.slice();
    return data?.sort((a, b) =>
      DateTime.fromISO(a.createdAt) < DateTime.fromISO(b.createdAt) ? 1 : -1
    );
  },
});
