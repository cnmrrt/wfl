import Image from "next/image";
import Link from 'next/link';
import Script from 'next/script'

async function getAuthors() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export default async function Home() {
  const authorsData = await getAuthors();

  return (
    <html lang="en">
      <body>
        <Script src="/static/js/macy.js" />
        <main className="main" role="main">
          <h1>Words From Life</h1>
          <div className="home-container">
            <section className="section">
              <div id="macy-container">
                {
                  authorsData.map((item: any) =>
                    item.en_quotes !== "" && item.img != null ?
                      (
                        <div className="demo" ><Link href={"/authors/" + item.id + "-quotes"}>
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
          </div>
        </main>
      </body>
    </html>
  );
}
