import MainHeader from "@/components/layout/mainheader";
import { Providers } from "@/components/layout/providers";
import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import "../globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ['latin']
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "SiteCraft",
  description: "Build your website in 30 minutes",
  icons: process.env.NEXT_PUBLIC_BASE_URL + '/images/logo.png',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html:
            `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG}');`
        }} />
      </head>
      <body
        style={nunito.style} // default font
        className={`${raleway.variable} ${nunito.variable} antialiased`}
      >
        <Providers>
          <MainHeader />
          <main>
            {children}
          </main>
        </Providers>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG}`}
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  );
}
