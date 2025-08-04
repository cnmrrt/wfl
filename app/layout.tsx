import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   <html lang="en">
      <Head>
        <meta name="google-adsense-account" content="ca-pub-5581015881313741" />
      </Head>
      <body>{children}</body>
    </html>
  );
}


