import styles from "./Vocabulary.module.scss";
import Link from "next/link";
import { BookmarkSelect, useDataService } from "../../service/useDataService";
import { useCallback, useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import { BookmarkForm } from "./BookmarkForm/BookmarkForm";
import { DateTime } from "luxon";
import { WeeklyChart, WeeklyChartProps } from "./Chart/WeeklyChart";
import { getCountForLastSevenDays } from "./utils";
import { VocabCard } from "./VocabCard/VocabCard";

const VocabularyPage = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkSelect[]>([]);
  const [weeklyChartData, setWeeklyChartData] = useState<WeeklyChartProps["data"]>([]);
  const { getAllBookmarks, deleteBookmark } = useDataService();

  const fetchAndSetAllBookmarks = useCallback(() => {
    getAllBookmarks().then((x) => {
      const countForLast7Days = getCountForLastSevenDays(x.data);
      setWeeklyChartData(countForLast7Days);
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
      <WeeklyChart data={weeklyChartData} />
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