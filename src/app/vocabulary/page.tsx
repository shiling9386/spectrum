"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import { BookmarkSelect, useDataService } from "../service/useDataService";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { BookmarkForm } from "@/components/BookmarkForm";
import { DateTime } from "luxon";
import { WeeklyChart, WeeklyChartProps } from "@/components/WeeklyChart";
import { getCountForLastSevenDays } from "./utils";

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
      <Link href={"/"}>
        <span>&crarr;</span> Back to Home
      </Link>
      <br />
      <Divider />
      <BookmarkForm />
      <Divider />
      <WeeklyChart data={weeklyChartData} />
      <Row gutter={[16, 16]}>
        {bookmarks.map((bookmark) => (
          <Col key={bookmark.id}>
            <Card
              title={bookmark.word}
              extra={
                <Button type="text" danger onClick={() => handleDelete(bookmark.id)}>
                  Delete
                </Button>
              }
              style={{ width: 300 }}
            >
              <p>{bookmark.description}</p>
              {bookmark.usageExamples.length > 0 && (
                <List
                  dataSource={bookmark.usageExamples}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text type="secondary" italic>
                        {item.sentence}
                      </Typography.Text>
                    </List.Item>
                  )}
                />
              )}
              <Divider />
              <div className={styles.cardFooter}>
                <Tag color="#f50">{DateTime.fromISO(bookmark.createdAt).toFormat("dd LLL")}</Tag>
                <Tag color="cyan">{bookmark.type}</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyPage;
