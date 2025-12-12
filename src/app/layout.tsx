import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

// For root layout, we don't need params since there are no dynamic segments
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrl();
  return {
    metadataBase: new URL(baseUrl),
    title: "Birthday Greetings",
    description: "Send personalized birthday wishes to your loved ones",
    openGraph: {
      title: "Birthday Greetings",
      description: "Send personalized birthday wishes to your loved ones",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Birthday Greetings",
      description: "Send personalized birthday wishes to your loved ones",
      images: ["/api/og"],
    },
  };
}

// Keep the layout component simple with only the props it needs
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="flex-1 flex items-center justify-center py-8 md:py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
