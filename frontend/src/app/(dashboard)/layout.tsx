import MainHeader from "@/components/layout/mainheader";
import { Providers } from "@/components/layout/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SiteCraft",
  description: "Build your website in 30 minutes",
  icons:process.env.NEXT_PUBLIC_BASE_URL+'/images/logo.png'
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Providers>
        <MainHeader />
        <main>
          {children}
        </main>
      </Providers>
  );
}
