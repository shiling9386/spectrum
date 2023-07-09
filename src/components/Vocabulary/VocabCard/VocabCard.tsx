import { Divider, Dropdown, Empty, MenuProps, Popconfirm, Tooltip, Typography } from "antd";
import styles from "./VocabCard.module.scss";
import { DateTime } from "luxon";
import { MoreOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { BOOKMARK_COLORS } from "@/constants";
import { BookmarkSelect } from "@/model";

interface Props {
  bookmark: BookmarkSelect;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: number) => void;
}

export const VocabCard = ({ bookmark, onDelete }: Props) => {
  const getActionItems = useCallback(
    (id: number): MenuProps["items"] => {
      const handleConfirm = () => {
        onDelete(id);
      };
      return [
        {
          key: "edit",
          label: "Edit",
        },
        {
          key: "delete",
          danger: true,
          label: (
            <Popconfirm
              title="Delete Bookmark"
              description="are you sure to delete this bookmark?"
              onConfirm={handleConfirm}
            >
              Delete
            </Popconfirm>
          ),
        },
      ];
    },
    [onDelete]
  );

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.flexBetween}>
          <div className={styles.flex}>
            <Tooltip title={bookmark.type} overlayClassName={styles.tooltip}>
              <div
                className={styles.tag}
                style={{ backgroundColor: BOOKMARK_COLORS[bookmark.type] }}
              >
                {bookmark.type.charAt(0)}
              </div>
            </Tooltip>
            <Typography.Text strong ellipsis>
              {bookmark.word}
            </Typography.Text>
          </div>
          <Dropdown menu={{ items: getActionItems(bookmark.id) }} trigger={["click"]}>
            <div className={styles.actionsBtn}>
              <MoreOutlined style={{ color: "#108ee9", fontSize: "1.1rem" }} />
            </div>
          </Dropdown>
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
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>
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
