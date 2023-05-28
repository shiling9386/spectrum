import { Firebase_Config } from "@/constants";
import { initializeApp } from "@firebase/app";
import { child, get, getDatabase, ref, set } from "@firebase/database";
import { useCallback } from "react";
import { Word } from "./types";

const app = initializeApp(Firebase_Config);
const db = getDatabase(app);
const VocanDBRef = child(ref(db), "vocab");

export const useDB = () => {
  const getAllVocabularies = useCallback(async () => {
    const x = await get(VocanDBRef);
    const jsonData = x.toJSON();
    if (jsonData) {
      const allDates = Object.keys(jsonData);
      console.log(allDates);
    }
    return x.toJSON();
  }, []);

  const saveWord = useCallback(async (payload: { word: string; description: string }) => {
    const { word, description } = payload;
    const timeStamp = Date.now();
    const id: string = String(timeStamp);
    const newWord: Word = {
      id,
      word,
      createdAt: timeStamp,
      createdBy: "SL",
      updatedAt: timeStamp,
      updatedBy: "SL",
      description,
    };
    try {
      await set(ref(db, "vocab/" + id), newWord);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    getAllVocabularies,
    saveWord,
  };
};
