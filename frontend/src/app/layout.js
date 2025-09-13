import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/Provider";
import Navbar from "@/components/Navbar";  // ✅ Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TalentAlign",
  description: "AI powered job application platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />      {/* ✅ Navbar */}
          <main>{children}</main> {/* Page content */}
        </Providers>
      </body>
    </html>
  );
}
