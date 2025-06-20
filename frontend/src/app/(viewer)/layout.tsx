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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          style={nunito.style} // default font
          className={`${raleway.variable} ${nunito.variable} antialiased`}
        >
          {children}
          {/* Google Tag Manager (noscript) */}
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG}`}
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
          {/* End Google Tag Manager (noscript) */}
        </body>
      </html>
    </>
  );
}
