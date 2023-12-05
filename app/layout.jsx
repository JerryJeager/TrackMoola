import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/home/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Track Moola",
  description: "Track and Monitor your expenses with TrackMoola",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
