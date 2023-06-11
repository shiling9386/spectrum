"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import { useDataService } from "../service/useDataService";
import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "@prisma/client";
import { Button, Card, Col, Divider, Row } from "antd";
import { BookmarkForm } from "@/components/BookmarkForm";

const VocabularyPage = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { getAllBookmarks, deleteBookmark } = useDataService();

  const fetchAndSetAllBookmarks = useCallback(() => {
    getAllBookmarks().then((x) => {
      setBookmarks(x.data);
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
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyPage;
