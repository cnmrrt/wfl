import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google';
import Navbar from '../../components/navbar';

type Props = {
  params: { slug: string }
}

async function getData() {
  const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/words.json')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const data = await getData()
  const filteredData = data.filter((item: any) => (item.id).toLowerCase() === params.slug);
  const word = filteredData[0].word;
  const desc = filteredData[0].en_meta_desc;
  const img = "https://wordsfromlife.com" + filteredData[0].img;
  return {
    title: "Meaning of " + word,
    description: desc,
    alternates: {
      canonical: "https://wordsfromlife.com/words/" + word.toLowerCase(),
    },
    openGraph: {
      title: "Meaning of " + word,
      description: desc,
      url: "https://wordsfromlife.com/words/" + word.toLowerCase(),
      siteName: 'Words From Life',
      images: [
        {
          url: img,
        }
      ],
      type: 'website',
    }
  }
}


export default async function country({ params }: { params: { slug: string } }) {
  const data = await getData()
  const filteredData = data.filter((item: any) => (item.id).toLowerCase() === params.slug);
  const word = filteredData[0].word;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Words",
      "item": "https://wordsfromlife.com/words"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": word
    }]
  }

  return (
    <html lang='en'>
      <body>
        <GoogleTagManager gtmId="GTM-TKDV62Q" />
        <Navbar />
        <div className='author-detail-container'>
          {filteredData.map((item: any) => (
            <main className='author-detail-main' key={item.id}>
              <h1>{item.word}</h1>
              <div id='main-image'>
                {item.img !== "" && item.img != null ?
                  (
                    <img
                      src={item.img}
                      alt={item.word}
                      width={item.img_width}
                      height={item.img_height}
                    />
                  ) : null}
              </div>
              <div className='section' dangerouslySetInnerHTML={{ __html: item.content }} />
              <div id="related-words">
                <span id="related-words-title">Related Words</span>
                <ul id="related-words-list">
                
                </ul>
              </div> 
            </main>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </body>
    </html>
  )
}


