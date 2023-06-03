// import { prisma } from "@/db";
import { BookmarkPayload } from "@/model";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VocabForm = () => {
  const [newWord, setNewWord] = useState("");
  const [description, setDescription] = useState("");

  const clearForm = () => {
    setNewWord("");
    setDescription("");
  };

  const handleSave = useCallback(() => {
    clearForm();
    const payload: BookmarkPayload = {
      word: newWord,
      description: description,
      createdBy: 1,
      //   createdAt: new Date(1685410817545),
    };
    axios
      .post("/api/vocabulary", payload)
      .then(() => {
        toast("Successfully bookmarked!", {
          type: "success",
          autoClose: 1000,
        });
      })
      .catch(() => {
        toast("Oops something went wrong!", {
          type: "error",
          autoClose: 1000,
        });
      });
  }, [description, newWord]);

  return (
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
  );
};
