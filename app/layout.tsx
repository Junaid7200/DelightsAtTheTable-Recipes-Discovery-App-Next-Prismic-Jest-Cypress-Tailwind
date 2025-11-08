import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { createClient } from "@/prismicio";

const inter = Inter({ subsets: ["latin"] })

// This fetches data once for the whole layout
const client = createClient();
const homeData = await client.getSingle("home");


// --- THIS SECTION IS UPDATED ---
export async function generateMetadata(): Promise<Metadata> {
  // Use the homeData you already fetched
  const title = homeData.data.meta_tile || "Recipe App";
  const description = homeData.data.meta_description || "Find your next favorite recipe.";
  const siteName = homeData.data.website_name || "Recipe App";
  const siteUrl = "https://your-app-url.com";

  return {
    // This part is for the browser tab
    title: {
      template: '%s | ' + siteName, // '%s' is replaced by the page title
      default: title, // The default title for the home page (app/page.tsx)
    },
    description: description,

    openGraph: {
      title: title,
      description: description,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          // You MUST add this image to your /public folder
          url: `${siteUrl}/Cover.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
  };
}
// --- END OF UPDATED SECTION ---


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"
      className={`${inter.className} antialiased`}
    >
      <body>
      <Nav page={homeData} />
      <main>
        {children}
      </main>
      <Footer page={homeData} />
      </body>
    </html>
  );
}