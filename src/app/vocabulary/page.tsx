"use client";

import styles from "./page.module.scss";
import { useCallback, useState } from "react";
import { useDB } from "@/components/useDB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [newWord, setNewWord] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { saveWord } = useDB();

  const handleSave = useCallback(() => {
    setIsSaving(true);
    saveWord(newWord)
      .then(() => {
        toast("Wow so easy!", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch(() => {
        toast("Oops, Something went wrong!", {
          type: "error",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [newWord, saveWord]);

  return (
    <div className={styles.main}>
      My Vocabulary
      <ToastContainer />
      <div>
        <input value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        <button disabled={newWord === ""} onClick={handleSave}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default User;
