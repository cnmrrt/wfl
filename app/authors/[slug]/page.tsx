import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
// import { GoogleTagManager } from '@next/third-parties/google'
import Navbar from '../../components/navbar';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() + "-quotes" === params.slug);
    const name = filteredData[0].name;
    const surname = filteredData[0].surname;
    const img = filteredData[0].img;
    const img_width = filteredData[0].img_width;
    const img_height = filteredData[0].img_height;

    return {
        title: name + " " + surname + " Quotes",
        description: "",
        alternates: {
            canonical: "https://wordsfromlife.com/authors/"+ name.toLowerCase() + "-" + surname.toLowerCase() +"-quotes",
        },
        openGraph: {
            title: name + " " + surname + " Quotes",
            description: "",
            url: "https://wordsfromlife.com/authors/"+ name.toLowerCase() + "-" + surname.toLowerCase() +"-quotes",
            siteName: 'Words From Life',
            images: [
                {
                    url: img,
                    width: img_width,
                    height: img_height,
                  }
                ],
            type: 'website',
          },
    }
}

async function getData() {const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json'); if (!res.ok) {throw new Error('Failed to fetch data')}return res.json()}

export default async function authors({ params }: { params: { slug: string } }) {
    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() + "-quotes" === params.slug);

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
                            <h1>{item.name} {item.surname} Quotes</h1>
                            <div id='main-image'>
                                <img
                                    src={item.img}
                                    alt={item.name + ' ' + item.surname}
                                    width={item.img_width}
                                    height={item.img_height}
                                />
                            </div>
                            <ul id='quotes'>
                                {item.en_quotes.map((subItem: any, index: any) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: subItem }}></li>
                                ))}
                            </ul>
                            <span style={{ display: 'block', textAlign: 'center' }}>{item.born}  - {item.dead}</span>
                            <div>


                            </div>
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


