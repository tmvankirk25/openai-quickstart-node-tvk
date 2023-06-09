import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();
  const [resultImage, setResultImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setResult("")

    const response = await fetch("/api/get-answer", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    })
    const responseImage = await fetch("/api/get-painting", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    })
    
    const dataImage = await responseImage.json()
    setResultImage(dataImage.text)
    setIsLoading(false)
    
    const data = await response.json()
    setResult(data.text.trim())
    setIsLoading(false)
  }
  

  return (
    <div>
      <Head>
        <title>h-Ai-ku</title>
      </Head>

      <main className={styles.main}>
        <h3>Haiku Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter a topic"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Generate Haiku" />
        </form>
        {isLoading && <div className={styles.loading_spinner}></div>}
        <div className={styles.result}>{result}</div>
        {isLoading == false && <img className={styles.image} src={resultImage} />}
      </main>
    </div>
  );
}
