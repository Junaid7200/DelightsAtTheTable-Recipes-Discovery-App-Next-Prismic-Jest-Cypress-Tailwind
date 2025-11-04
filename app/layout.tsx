import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { createClient } from "@/prismicio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const client = createClient();
const homeData = await client.getSingle("home");


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homeData = await client.getSingle("home");

  return {
    title: homeData.data.meta_tile || "Recipe App",
    description: homeData.data.meta_description || "Find your next favorite recipe.",
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
      <Nav page={homeData} />
        {children}
      <Footer page={homeData} />
      </body>
    </html>
  );
}
