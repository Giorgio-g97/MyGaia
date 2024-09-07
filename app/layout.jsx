// Import Descope Auth
import NextAuthSessionProvider from "./provider";

//Import font Google
import { Jost } from "next/font/google";

import "./globals.css";

// Import Pages
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={jost.className}>
        <NextAuthSessionProvider>
          <div>
            <Header />
            {children}
          </div>
        </NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
