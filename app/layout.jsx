import "./globals.css";
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import StoreModalProvider from "@/Providers/store-modal-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Dashboard",
};

const inter = Inter({subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <Toaster />
        <StoreModalProvider />
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
