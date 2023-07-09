import { BookmarkSelect } from "@/model";
import { atom } from "recoil";

export const bookmarksAtom = atom<BookmarkSelect[] | undefined>({
  key: "bookmarksAtom",
  default: undefined,
});
