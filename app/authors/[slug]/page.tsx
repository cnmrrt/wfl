export async function generateStaticParams() {
    const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data
        .filter((item: any) => item.en_quotes !== "" && item.img != null)
        .map((item: any) => ({ slug: (item.id).toLowerCase() + "-quotes" }));
}
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google';
import Navbar from '../../components/navbar';

type Props = {
    params: Promise<{ slug: string }>
}
async function getData() { const res = await fetch('https://words-from-life-5cb26-default-rtdb.firebaseio.com/quotes/authors-new.json', { cache: 'force-cache' }); if (!res.ok) { throw new Error('Failed to fetch data') } return res.json() }

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;

    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() + "-quotes" === params.slug);
    const name = filteredData[0].name;
    const surname = filteredData[0].surname;
    const img = "https://wordsfromlife.com" + filteredData[0].img;
    const img_width = filteredData[0].img_width;
    const img_height = filteredData[0].img_height;
    const en_desc = filteredData[0].en_meta_desc;
    return {
        title: name + " " + surname + " Quotes",
        description: en_desc,
        alternates: {
            canonical: "https://wordsfromlife.com/authors/" + filteredData[0].id + "-quotes",
        },
        openGraph: {
            title: name + " " + surname + " Quotes",
            description: "",
            url: "https://wordsfromlife.com/authors/" + filteredData[0].id + "-quotes",
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


export default async function authors(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const data = await getData()
    const filteredData = data.filter((item: any) => (item.id).toLowerCase() + "-quotes" === params.slug);
    const name = filteredData[0].name;
    const surname = filteredData[0].surname;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Authors",
            "item": "https://wordsfromlife.com/authors"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": name + " " + surname + " Quotes"
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


