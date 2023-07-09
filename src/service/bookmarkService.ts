import { BookmarkPayload, BookmarkSelect } from "@/model";
import { Bookmark } from "@prisma/client";
import axios, { AxiosResponse } from "axios";

const getURL = (bookmarkId?: number) => {
  const baseURL = "/api/vocabulary";
  return bookmarkId ? baseURL + "/" + bookmarkId : baseURL;
};

const fetchAllBookmarks = () => {
  return axios.get<any, AxiosResponse<BookmarkSelect[]>>(getURL());
};

const addBookmark = (bookmarkPayload: BookmarkPayload) => {
  return axios.post<BookmarkPayload, AxiosResponse<Bookmark>>(getURL(), bookmarkPayload);
};

const addBookmarks = (bookmarkPayloadList: BookmarkPayload[]) => {
  return Promise.allSettled(bookmarkPayloadList.map((payload) => addBookmark(payload)));
};

const deleteBookmark = (bookmarkId: number) => {
  return axios.delete(getURL(bookmarkId));
};

const bookmarkService = {
  fetchAllBookmarks,
  addBookmark,
  addBookmarks,
  deleteBookmark,
};

export default bookmarkService;
