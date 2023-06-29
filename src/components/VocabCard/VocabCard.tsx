import { BookmarkSelect } from "@/app/service/useDataService";
import { Divider, Empty, Tooltip, Typography } from "antd";
import styles from "./VocanCard.module.scss";
import { BookmarkType } from "@prisma/client";
import { DateTime } from "luxon";

interface Props {
  bookmark: BookmarkSelect;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: number) => void;
}

export const VocabCard = ({ bookmark, onDelete }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.flex}>
          <Tooltip title={bookmark.type} overlayClassName={styles.tooltip}>
            <div className={styles.tag} style={{ backgroundColor: BOOKMARK_COLORS[bookmark.type] }}>
              {bookmark.type.charAt(0)}
            </div>
          </Tooltip>
          <Typography.Text strong ellipsis>
            {bookmark.word}
          </Typography.Text>
        </div>
        <Tooltip title={bookmark.description} overlayClassName={styles.tooltip}>
          <Typography.Text italic className={styles.description}>
            {bookmark.description}
          </Typography.Text>
        </Tooltip>
        <Divider dashed style={{ padding: 0, marginBlock: 6 }} />
      </div>
      <div className={styles.cardBody}>
        {bookmark.usageExamples.length > 0 ? (
          <ul className={styles.usageExample}>
            {bookmark.usageExamples.map((example) => (
              <li key={example.id}>
                <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                  {example.sentence}
                </Typography.Text>
              </li>
            ))}
          </ul>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Usage Example" />
        )}
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.timeRelative}>
          Created {DateTime.fromISO(bookmark.createdAt).toRelative()}
        </div>
      </div>
    </div>
  );
};

const BOOKMARK_COLORS = {
  WORD: "#2db7f5",
  TERMINOLOGY: "108ee9",
  SLANG: "#87d068",
  PROVERB: "#f50",
} satisfies Record<BookmarkType, string>;
