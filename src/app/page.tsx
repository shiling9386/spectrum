"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { BiSolidBook } from "react-icons/bi";
import { BsCalendar2Week, BsBook } from "react-icons/bs";

export default function Home() {
  const [menuExpanded, setMenuExpanded] = useState(true);
  return (
    <div className={styles.container}>
      <div className={menuExpanded ? styles.sidemenu : styles.sidemenu_collapse}>
        <div className={styles.brand}></div>
        <div className={styles.menus}>
          <div className={styles.menuItem}>
            <BsBook />
            <label>My Dictionary</label>
          </div>
          <div className={styles.menuItem}>
            <BsCalendar2Week />
            <label>Calendar</label>
          </div>
        </div>
        <div className={styles.settings}></div>
        <div className={styles.footer} onClick={() => setMenuExpanded((x) => !x)}></div>
      </div>
      <div className={styles.main}>
        <Link href={"/vocabulary"}>My Dictionary</Link>
      </div>
    </div>
  );
}
