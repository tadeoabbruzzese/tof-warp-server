import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

export const metadata = {
  title: 'Warp Server - Aida Reforged',
  description: 'Database & Wiki for Tower of Fantasy Warp Server',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
