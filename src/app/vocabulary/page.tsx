"use client";

import styles from "./page.module.scss";
import { useCallback, useState } from "react";
import { useDB } from "@/components/useDB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const User = () => {
  const [newWord, setNewWord] = useState("");
  const [description, setDescription] = useState("");
  const { saveWord } = useDB();

  const clearForm = () => {
    setNewWord("");
    setDescription("");
  };
  const handleSave = useCallback(() => {
    saveWord({
      word: newWord,
      description,
    })
      .then(() => {
        toast("Wow so easy!", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast("Oops, Something went wrong!" + err, {
          type: "error",
          autoClose: 3000,
        });
      })
      .finally(() => {
        clearForm();
      });
  }, [description, newWord, saveWord]);

  return (
    <div className={styles.main}>
      <Link href={"/"}>
        <span>&crarr;</span> Back
      </Link>
      <br />
      My Vocabulary
      <ToastContainer />
      <div>
        <input placeholder="Word" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        <br />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button disabled={newWord === ""} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default User;
