import Link from 'next/link';
import Script from 'next/script'
import Navbar from '../components/navbar';
import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';

async function getPreverbs() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/idioms%20and%20proverbs/en/preverbs.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export const metadata: Metadata = {
  title: 'Proverbs',
  description: '',
  alternates: {
    canonical: "https://wordsfromlife.com/preverbs",
  }
}

export default async function Preverbs() {
  const preverbsData = await getPreverbs();
  return (
    <html lang="en">
      <head>
        <Script src="/static/js/macy.js" />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-TKDV62Q" />
        <Navbar />
        <main className="main" role="main">
          <h1>Proverbs</h1>
          <div className="home-container proverb-container">
            <section className="section">
              <ul>
                {
                  preverbsData.map((item: any) =>
                  (
                    <li className="" key={item.id}><Link href={"/preverbs/" + item.id}>{item.preverb}</Link></li>
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
