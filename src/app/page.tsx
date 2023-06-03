import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Hi Shi Ling</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Link href={"/vocabulary"}>
            <h2>
              English Corner<span>-&gt;</span>
            </h2>
            <p>A place to review and learn new vocabulary</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
