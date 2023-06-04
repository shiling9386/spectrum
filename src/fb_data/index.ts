import { BookmarkPayload } from "@/model";
import { toast } from "react-toastify";
import { vocabDic } from "./vocab";
import { useDataService } from "@/app/service/useDataService";

export const useFBData = () => {
  const { addBookmarks } = useDataService();
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
  return {
    syncDataFromFirebaseToPlanetScale,
  };
};
