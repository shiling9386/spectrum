import styles from "./Vocabulary.module.scss";
import { Divider } from "antd";
import { BookmarkForm } from "./BookmarkForm/BookmarkForm";
import { SummaryVisuals } from "./SummaryVisuals";
import { ListView } from "./ListView/ListView";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { bookmarksState } from "@/atoms/bookmark";
import bookmarkService from "@/service/bookmarkService";
import { useCallback } from "react";

const VocabularyPage = () => {
  const refreshData = useRecoilRefresher_UNSTABLE(bookmarksState);

  const handleDelete = useCallback(
    (bookmarkId: number) => {
      bookmarkService.deleteBookmark(bookmarkId).then(refreshData);
    },
    [refreshData]
  );

  return (
    <div className={styles.main}>
      <BookmarkForm onSuccess={refreshData} />
      <Divider />
      <SummaryVisuals />
      <Divider />
      <ListView onDelete={handleDelete} />
    </div>
  );
};

export default VocabularyPage;
