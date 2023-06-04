// import { prisma } from "@/db";
import { BookmarkPayload } from "@/model";
import { Button, Input, Segmented } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { TextArea } = Input;

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
      <Segmented size="small" options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]} />
      <br />
      <br />
      <Input
        placeholder="Bookmark"
        value={newWord}
        allowClear
        onChange={(x) => setNewWord(x.target.value)}
      />
      <br />
      <br />
      <TextArea
        showCount
        maxLength={1000}
        style={{ height: 120, resize: "none" }}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />
      <br />
      <Button disabled={newWord === ""} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};
