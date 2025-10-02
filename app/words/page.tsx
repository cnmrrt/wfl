import Link from 'next/link';
import Script from 'next/script'
import Navbar from '../components/navbar';
import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';

async function getWords() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/words.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export const metadata: Metadata = {
  title: 'List of Words',
  description: '',
  alternates: {
    canonical: "https://wordsfromlife.com/words",
  }
}


export default async function Words() {
  const wordsData = await getWords();
  const sortedData = wordsData.sort((a: any, b: any) => {
    if (a.word < b.word) {
      return -1;
    }
  });

  return (
    <html lang="en">
      <head>
        <Script src="/static/js/macy.js" />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-TKDV62Q" />
        <Navbar />
        <main className="main" role="main">
          <h1>Words</h1>
          <div className="home-container words-container">
          
            <section className="section">
              <ul>
                {
                  sortedData.map((item: any) =>
                  (
                    <li className="" key={item.id}><Link href={"/words/" + item.id}>{item.word}</Link></li>
                  )
                  )
                }
              </ul>
            </section>
          </div>
        </main>
      </body>
    </html>
  )
}
