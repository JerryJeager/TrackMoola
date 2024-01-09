
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import { AuthContextProvider } from "../context/AuthContext";

type LayoutProps = {
  children: React.ReactNode
}



export default function RootLayout(props: LayoutProps) {
  return (
    <main className="bg-primary h-full pb-[4rem]">
        <Header />
          <AuthContextProvider>
            {props.children}
          </AuthContextProvider>
        <Navbar />
    </main>
  );
}