import Image from "next/image";
import Link from 'next/link';
import Script from 'next/script'
import Navbar from './components/navbar';
import type { Metadata } from 'next';
// import { GoogleTagManager } from '@next/third-parties/google';



async function getAuthors() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }
async function getWords() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/words.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }
async function getPreverbs() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/idioms%20and%20proverbs/en/preverbs.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export const metadata: Metadata = {
  title: 'Words From Life',
  description: '',
  alternates: {
    canonical: "https://wordsfromlife.com/",
  }
}

export default async function Home() {
  const authorsData = await getAuthors();
  const wordsData = await getWords();
  const preverbsData = await getPreverbs();

  return (
    <html lang="en">
      <body>
        <Script src="/static/js/macy.js" />
        <Navbar />
        <main className="main" role="main">
          <h1>Words From Life</h1>
          <div className="home-container">
            <section className="section">
              <div id="macy-container">
                {
                  authorsData.map((item: any) =>
                    item.en_quotes !== "" && item.img != null ?
                      (
                        <div className="demo" key={item.id}>
                          <Link href={"/authors/" + item.id + "-quotes"}>
                          <img
                            src={item.img}
                            alt={item.name + ' ' + item.surname}
                            width={item.img_width}
                            height={item.img_height} />
                          <span style={{ display: 'block', textAlign: 'center', padding: '.2rem 0' }}>
                            {item.name} {item.surname}
                          </span>
                        </Link></div>
                      ) : null
                  )
                }
              </div>
            </section>
            <section className="section">
              <h2 style={{ fontSize: '40px', textAlign: 'center', margin: '3rem 0 2rem 0' }}>Words</h2>
              <div id={'word-container'}>

                {
                  wordsData.map((item: any) =>
                  (
                    <div className="demo" key={item.id}><Link href={"/words/" + item.id}><span>{item.word}</span> <p>{item.en_meta_desc}</p></Link></div>
                  )
                  )
                }
              </div>
            </section>
            <section className="section">
              <h2 style={{ fontSize: '40px', textAlign: 'center', margin: '3rem 0 2rem 0' }}>Preverbs</h2>
              <div id={'preverbs-container'}>
                  {
                    preverbsData.map((item: any) =>
                    (
                      <div className="demo" key={item.id}><Link href={"/preverbs/" + item.id}>
                        <span>{item.preverb}</span>
                      </Link></div>
                    )
                    )
                  }
              </div></section>
          </div>
        </main>
      </body>
    </html>
  );
}
