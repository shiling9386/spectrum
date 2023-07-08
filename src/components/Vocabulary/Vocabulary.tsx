import styles from "./Vocabulary.module.scss";
import { BookmarkSelect, useDataService } from "../../service/useDataService";
import { useCallback, useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import { BookmarkForm } from "./BookmarkForm/BookmarkForm";
import { DateTime } from "luxon";
import { VocabCard } from "./VocabCard/VocabCard";
import { SummaryVisuals } from "./SummaryVisuals";

const VocabularyPage = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkSelect[]>([]);
  const { getAllBookmarks, deleteBookmark } = useDataService();

  const fetchAndSetAllBookmarks = useCallback(() => {
    getAllBookmarks().then((x) => {
      setBookmarks(
        x.data.sort((a, b) =>
          DateTime.fromISO(a.createdAt) < DateTime.fromISO(b.createdAt) ? 1 : -1
        )
      );
    });
  }, [getAllBookmarks]);

  useEffect(() => {
    fetchAndSetAllBookmarks();
  }, [fetchAndSetAllBookmarks]);

  const handleDelete = useCallback(
    (bookmarkId: number) => {
      deleteBookmark(bookmarkId).then(fetchAndSetAllBookmarks);
    },
    [deleteBookmark, fetchAndSetAllBookmarks]
  );
  return (
    <div className={styles.main}>
      <BookmarkForm onSuccess={fetchAndSetAllBookmarks} />
      <Divider />
      <SummaryVisuals />
      <Row gutter={[16, 16]}>
        {bookmarks.map((bookmark) => (
          <Col key={bookmark.id}>
            <VocabCard bookmark={bookmark} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyPage;
