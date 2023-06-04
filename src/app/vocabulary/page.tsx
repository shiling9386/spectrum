"use client";
import styles from "./page.module.scss";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { VocabForm } from "@/components/VocabForm";
import { vocabDic } from "@/fb_data/vocab";
import { BookmarkPayload } from "@/model";
import { useDataService } from "../service/useDataService";
import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "@prisma/client";

const VocabularyPage = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { addBookmarks, getAllBookmarks, deleteBookmark } = useDataService();

  const fetchAndSetAllBookmarks = useCallback(() => {
    getAllBookmarks().then((x) => {
      setBookmarks(x.data);
    });
  }, [getAllBookmarks]);

  useEffect(() => {
    fetchAndSetAllBookmarks();
  }, [fetchAndSetAllBookmarks]);

  const syncDataFromFirebaseToPlanetScale = () => {
    const bookmarkPayloadList: BookmarkPayload[] = [];
    for (let entry of Object.entries(vocabDic.vocab)) {
      const data = entry[1];
      bookmarkPayloadList.push({
        word: data.word,
        description: data.description,
        createdBy: 1,
        createdAt: new Date(data.createdAt),
      });
    }
    addBookmarks(bookmarkPayloadList).then(() => {
      toast("Yo", {
        type: "success",
      });
    });
  };

  const handleDelete = useCallback(
    (bookmarkId: number) => {
      deleteBookmark(bookmarkId).then(fetchAndSetAllBookmarks);
    },
    [deleteBookmark, fetchAndSetAllBookmarks]
  );
  return (
    <div className={styles.main}>
      <ul>
        {bookmarks.map((b) => (
          <li key={b.id}>
            {b.word}
            <span onClick={() => handleDelete(b.id)}>Delete</span>
          </li>
        ))}
      </ul>
      <Link href={"/"}>
        <span>&crarr;</span> Back
      </Link>
      <br />
      My Vocabulary
      <ToastContainer />
      <VocabForm />
      <button onClick={syncDataFromFirebaseToPlanetScale}>Sync data</button>
    </div>
  );
};

export default VocabularyPage;
