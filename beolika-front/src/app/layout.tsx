import "./globals.css";
import { Darker_Grotesque } from "next/font/google";
import Script from "next/script";
import Head from "next/head";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata = {
  title: "Beolika Themes",
  description: "Generated by create next app",
};

const darker = Darker_Grotesque({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"], variable: "--font-darker" });
const sego = localFont({
  src: [
    {
      path: "../../public/fonts/sego.ttf",
    },
  ],
  variable: "--font-sego",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${darker.variable} ${sego.variable}`}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
      </Head>
      <body className="min-w-screen bg-[var(--color-primary)]" suppressHydrationWarning={true}>
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
        <Script
          async
          src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js"
          id="snipcart"
          data-api-key={process.env.SNIPCART_API_TOKEN}
          data-config-modal-style="side"></Script>
      </body>
    </html>
  );
}
