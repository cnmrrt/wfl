import Link from 'next/link';
import Navbar from '../components/navbar';
import Script from 'next/script';
import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';


async function getAuthors() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export const metadata: Metadata = {
  title: 'Inspirational Quotes by Authors',
  description: '',
  alternates: {
    canonical: "https://wordsfromlife.com/authors",
  }
}

export default async function Authors() {

  const authorsData = await getAuthors();
  return (
    <html lang="en"> 
      <head>
        <Script src="/static/js/macy.js" />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-TKDV62Q" />
        <Navbar />
        <main className="main" role="main">
          <h1>Quotes by Authors</h1>
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
                            <span style={{ display: 'block', textAlign: 'center', padding: '.2rem 0' }}>{item.name} {item.surname}</span>
                          </Link></div>
                      ) : null
                  )
                }
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  )
}