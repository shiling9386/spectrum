"use client";
import styles from "./page.module.scss";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { VocabForm } from "@/components/VocabForm";

const VocabularyPage = () => {
  return (
    <div className={styles.main}>
      {/* {bookmarks.map((b) => b.word)} */}
      <Link href={"/"}>
        <span>&crarr;</span> Back
      </Link>
      <br />
      My Vocabulary
      <ToastContainer />
      <VocabForm />
    </div>
  );
};

export default VocabularyPage;
