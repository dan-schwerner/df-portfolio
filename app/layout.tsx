import type { Metadata } from "next";
import Script from "next/script";
import './global.css';
import {promises as fs } from 'fs';
import { MenuItem } from "@/types/Types";
import theme from "@/theme";
import HeaderMenu from "@/components/header-menu/HeaderMenu";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Dan Falzon — Portafoll",
  description: "Il-portafoll, l-esperjenza, u l-blog ta' Dan Falzon.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const response = await fs.readFile(process.cwd() + '/app/data/menuItems.json', 'utf8');
  const menuItems: MenuItem[] = JSON.parse(response).data;

  return (
    <html lang="mt">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BRKTGD2GE5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BRKTGD2GE5');
          `}
        </Script>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <header>
              <HeaderMenu menuItems={menuItems} />
            </header>
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
