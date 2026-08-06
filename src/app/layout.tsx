import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kadadi Insurance Advisory | Bidar's Trusted Insurance & Motor Desk",
  description: "Chandrakant Kadadi brings 30+ years of insurance expertise in Bidar for Motor, Health, Commercial, Life, & Claims settlement assistance.",
  keywords: ["Insurance Bidar", "Motor Insurance Bidar", "Health Insurance", "Claim Support", "Chandrakant Kadadi", "Kadadi Motors"],
  authors: [{ name: 'Chandrakant Kadadi' }],
  creator: 'Kadadi Motors & Insurance Advisory',
  openGraph: {
    title: "Kadadi Insurance Advisory | Bidar's Trusted Insurance & Motor Desk",
    description: "Chandrakant Kadadi brings 30+ years of insurance expertise in Bidar for Motor, Health, Commercial, Life, & Claims settlement assistance.",
    type: "website",
    siteName: "Kadadi Motors & Insurance Advisory",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadadi Insurance Advisory | Bidar's Trusted Insurance & Motor Desk",
    description: "Chandrakant Kadadi brings 30+ years of insurance expertise in Bidar for Motor, Health, Commercial, Life, & Claims settlement assistance.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans min-h-screen selection:bg-amber-400 selection:text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
