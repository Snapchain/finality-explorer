import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-responsive-modal/styles.css";
import "react-tooltip/dist/react-tooltip.css";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "Tohma Finality Explorer";
const description = "Finality explorer for Snapchain Tohma devnet";
const url = "https://tohma.finality-explorer.snapcha.in";
const imageUrl = `${url}/logo-card.png`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: imageUrl,
        width: 2048,
        height: 1170,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
  other: {
    "telegram:title": title,
    "telegram:description": description,
    "telegram:image": imageUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="supported-color-schemes" content="dark only" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
