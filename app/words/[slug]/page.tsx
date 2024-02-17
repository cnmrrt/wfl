import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
// import { GoogleTagManager } from '@next/third-parties/google';
import Navbar from '../../components/navbar';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    return {
        title: "Word",
    }
}


async function getData() {
    const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/words.json')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

export default async function country({ params }: { params: { slug: string } }) {
    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() === params.slug);

    // const breadcrumbSchema = {
    //     "@context": "https://schema.org",
    //     "@type": "BreadcrumbList",
    //     "itemListElement": [{
    //         "@type": "ListItem",
    //         "position": 1,
    //         "name": country + " Map, Flag, Language and Info"
    //     }]
    // }

    return (
        <html lang='en'>
            <body>
                {/* <GoogleTagManager gtmId="GTM-PDHR5KXB" /> */}
                <Navbar />
                <div className='author-detail-container'>
                {filteredData.map((item: any) => (
              <main className='author-detail-main' key={item.id}>
                <h1>{item.word}</h1>
                <div id='main-image'>
                  <img
                    src= {item.img}
                    alt={item.word} 
                    width={item.img_width} 
					height={item.img_height}
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </main>
              
            ))}
                </div>
                {/* <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                    /> */}
            </body>
        </html>
    )
}


