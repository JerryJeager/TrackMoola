import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Header";
import { AuthContextProvider } from "./context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Track Moola",
  description: "Track and Monitor your expenses with TrackMoola",
};

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* <AuthContextProvider> */}
          {props.children}
        {/* </AuthContextProvider> */}
      </body>
    </html>
  );
}
