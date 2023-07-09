import { selector } from "recoil";
import bookmarkService from "@/service/bookmarkService";
import { BookmarkSelect } from "@/model";
import { DateTime } from "luxon";

export const bookmarksState = selector<BookmarkSelect[]>({
  key: "bookmarksState",
  get: async () => {
    return (await bookmarkService.fetchAllBookmarks()).data.sort((a, b) =>
      DateTime.fromISO(a.createdAt) < DateTime.fromISO(b.createdAt) ? 1 : -1
    );
  },
});
