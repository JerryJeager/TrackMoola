import Navbar from "../components/dashboard/Navbar";
import Header from "../components/ui/Header";




export default function RootLayout({ children }) {
  return (
    <main className="bg-primary h-full pb-[4rem]">
        <Header />
        {children}
        <Navbar />
    </main>
  );
}