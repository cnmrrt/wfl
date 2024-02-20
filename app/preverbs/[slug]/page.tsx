import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google';
import Navbar from '../../components/navbar';

type Props = {
    params: { slug: string }
}
async function getData() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/idioms%20and%20proverbs/en/preverbs.json'); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() === params.slug);
    const preverb = filteredData[0].preverb;
    const desc = filteredData[0].en_meta_desc;
    const img = "https://wordsfromlife.com" + filteredData[0].img;
    const img_width = filteredData[0].img_width;
    const img_height = filteredData[0].img_height;

    return {
        title: preverb,
        description: desc,
        alternates: {
            canonical: "https://wordsfromlife.com/preverbs/" + preverb,
        },
        openGraph: {
            title: preverb,
            description: desc,
            url: "https://wordsfromlife.com/preverbs/" + preverb,
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


export default async function authors({ params }: { params: { slug: string } }) {
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
                <GoogleTagManager gtmId="GTM-TKDV62Q" />
                <Navbar />
                <div className='author-detail-container'>
                    {filteredData.map((item: any) => (
                        <main className='author-detail-main' key={item.id}>
                            <h1>{item.preverb}</h1>
                            <div id='main-image'>
                                <img
                                    src={item.img}
                                    alt={item.name + ' ' + item.surname}
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


