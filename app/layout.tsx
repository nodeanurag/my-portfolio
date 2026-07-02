import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Konami } from "@/components/konami";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";



const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const url = "https://example.com"; // TODO: your deployed URL

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* set theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
          <Konami />
          <Script src="/oneko.js" strategy="lazyOnload" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}