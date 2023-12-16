import Header from "../components/ui/Header";

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: LayoutProps) {
  return (
   <main className="bg-homeRadialBg4 mb-0 pb-[6rem] h-full lg:h-screen">
    <Header />
    {props.children}
   </main>
  );
}
