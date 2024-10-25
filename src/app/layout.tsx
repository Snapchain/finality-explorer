import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-responsive-modal/styles.css";
import "react-tooltip/dist/react-tooltip.css";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Snapchain - Finality Explorer",
  description: "Snapchain Tohma devnet finality explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Snapchain - Finality Explorer" />
      <meta
        name="description"
        content="Snapchain Tohma devnet finality explorer"
        key="desc"
      />
      <meta
        property="og:description"
        content="Snapchain Tohma devnet finality explorer"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="2048" />
      <meta property="og:image:height" content="1170" />
      <meta property="og:image" content={`/og.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Snapchain - Finality Explorer" />
      <meta
        name="twitter:description"
        content="Snapchain Tohma devnet finality explorer"
      />
      <meta name="twitter:image" content={`/og.png`} />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="2048" />
      <meta name="twitter:image:height" content="1170" />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
