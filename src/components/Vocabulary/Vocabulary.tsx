import styles from "./Vocabulary.module.scss";
import { Divider } from "antd";
import { BookmarkForm } from "./BookmarkForm/BookmarkForm";
import { SummaryVisuals } from "./SummaryVisuals";
import { ListView } from "./ListView/ListView";
import { useSetRecoilState } from "recoil";
import bookmarkService from "@/service/bookmarkService";
import { useCallback, useEffect } from "react";
import { bookmarksAtom } from "@/atoms/bookmark/atom";

const VocabularyPage = () => {
  const setBookmarks = useSetRecoilState(bookmarksAtom);

  const fetchAllBookmarks = useCallback(async () => {
    const data = (await bookmarkService.fetchAllBookmarks()).data;
    setBookmarks(data);
  }, [setBookmarks]);

  useEffect(() => {
    fetchAllBookmarks();
  }, [fetchAllBookmarks]);

  const handleDelete = useCallback(
    (bookmarkId: number) => {
      bookmarkService.deleteBookmark(bookmarkId).then(fetchAllBookmarks);
    },
    [fetchAllBookmarks]
  );

  return (
    <div className={styles.main}>
      <BookmarkForm onSuccess={fetchAllBookmarks} />
      <Divider />
      <SummaryVisuals />
      <Divider />
      <ListView onDelete={handleDelete} />
    </div>
  );
};

export default VocabularyPage;
