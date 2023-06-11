import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { BookmarkPayload } from "@/model";
import { Bookmark, UsageExample } from "@prisma/client";

const getURL = (bookmarkId?: number) => {
  const baseURL = "/api/vocabulary";
  return bookmarkId ? baseURL + "/" + bookmarkId : baseURL;
};
export type BookmarkSelect = Bookmark & {
  usageExamples: UsageExample[];
};
export const useDataService = () => {
  const getAllBookmarks = useCallback(() => {
    return axios.get<any, AxiosResponse<BookmarkSelect[]>>(getURL());
  }, []);

  const addBookmark = useCallback((bookmarkPayload: BookmarkPayload) => {
    return axios.post<BookmarkPayload, AxiosResponse<Bookmark>>(getURL(), bookmarkPayload);
  }, []);

  const addBookmarks = useCallback(
    (bookmarkPayloadList: BookmarkPayload[]) => {
      return Promise.allSettled(bookmarkPayloadList.map((payload) => addBookmark(payload)));
    },
    [addBookmark]
  );

  const deleteBookmark = useCallback((bookmarkId: number) => {
    return axios.delete(getURL(bookmarkId));
  }, []);

  return {
    addBookmark,
    addBookmarks,
    deleteBookmark,
    getAllBookmarks,
  };
};
