"use client";
import { ReactElement, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { BsCalendar2Week, BsBook } from "react-icons/bs";
import classNames from "classnames";
import { IconBase, IconType } from "react-icons";
import VocabularyPage from "@/components/Vocabulary/Vocabulary";

type MenuItemType = "Dictionary" | "Calendar";
interface MenuItem {
  icon: ReactElement;
  label: string;
  id: MenuItemType;
}
const menuItems: MenuItem[] = [
  {
    icon: <BsBook />,
    label: "Dictionary",
    id: "Dictionary",
  },
  {
    icon: <BsCalendar2Week />,
    label: "Calendar",
    id: "Calendar",
  },
];
export default function Home() {
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemType>("Dictionary");

  const renderMainComponent = () => {
    switch (activeMenuItem) {
      case "Dictionary":
        return <VocabularyPage />;
      case "Calendar":
        return "Coming Soon";
    }
  };
  return (
    <div className={styles.container}>
      <div className={menuExpanded ? styles.sidemenu : styles.sidemenu_collapse}>
        <div className={styles.brand}></div>
        <div className={styles.menus}>
          {menuItems.map((menuItem) => (
            <div
              className={classNames([
                styles.menuItem,
                menuItem.id === activeMenuItem ? styles.selected : 0,
              ])}
              key={menuItem.id}
              onClick={() => setActiveMenuItem(menuItem.id)}
            >
              {menuItem.icon}
              {menuExpanded && <label>{menuItem.label}</label>}
            </div>
          ))}
        </div>
        <div className={styles.settings}></div>
        <div className={styles.footer} onClick={() => setMenuExpanded((x) => !x)}></div>
      </div>
      <div className={styles.main}>{renderMainComponent()}</div>
    </div>
  );
}
