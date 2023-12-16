import Navbar from "../components/dashboard/Navbar";
import Header from "../components/ui/Header";

type LayoutProps = {
  children: React.ReactNode
}


export default function RootLayout(props: LayoutProps) {
  return (
    <main className="bg-primary h-full pb-[4rem]">
        <Header />
        {props.children}
        <Navbar />
    </main>
  );
}