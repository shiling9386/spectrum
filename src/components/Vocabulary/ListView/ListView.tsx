import { useRecoilValue } from "recoil";
import { VocabCard } from "../VocabCard/VocabCard";
import styles from "./ListView.module.scss";
import { recentBookmarksState } from "@/atoms/bookmark";
import { Skeleton } from "antd";

interface Props {
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: number) => void;
}

export const ListView = (props: Props) => {
  const { onDelete } = props;
  const bookmarks = useRecoilValue(recentBookmarksState);

  if (bookmarks === undefined) {
    return <Skeleton />;
  }
  return (
    <div className={styles.grid}>
      {bookmarks.map((bookmark) => (
        <VocabCard bookmark={bookmark} key={bookmark.id} onDelete={onDelete} />
      ))}
    </div>
  );
};
