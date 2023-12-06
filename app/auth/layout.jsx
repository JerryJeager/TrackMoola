import Header from "../components/ui/Header";



export default function RootLayout({ children }) {
  return (
   <main className="bg-homeRadialBg4 mb-0 pb-[6rem] h-full lg:h-screen">
    <Header />
    {children}
   </main>
  );
}
