import { promises as fs } from "fs"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import styles from "../styles/Home.module.css"

export default function Home({ entries }: { entries: string[] }) {
  const router = useRouter()
  const [entry, setEntry] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setEntry(entries[~~(Math.random() * entries.length)])
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [entries])

  function randomEntry(e: any) {
    e.preventDefault()
    router.push(`/${~~(Math.random() * entries.length) + 1}`)
  }

  return (
    <div>
      <Head>
        <title>วาทกรรมสลิ่มสุดเจ๋ง</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <span className={styles.red}>วาท</span>
            <span className={styles.white}>กรรม</span>
            <span className={styles.blue}>สลิ่ม</span>
            <span className={styles.white}>สุด</span>
            <span className={styles.red}>เจ๋ง</span>
          </h1>
          <p className={styles.entryRoulette}>
            <span>{entry}</span>
          </p>
          <p className={styles.action}>
            <button onClick={randomEntry} className={styles.button}>
              🚴‍♂️ ปั่นเลย! 🚴‍♀️
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  return {
    props: {
      entries,
    },
  }
}
