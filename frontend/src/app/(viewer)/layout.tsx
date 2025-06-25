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
          className={`${raleway.variable} ${nunito.variable} antialiased scroll-smooth`}
        >
          {children}
        </body>
      </html>
    </>
  );
}
