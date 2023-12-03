import Navbar from "../components/Navbar";



export default function RootLayout({ children }) {
  return (
   <main className="bg-homeRadialBg4 mb-0 pb-[6rem] h-full lg:h-screen">
    <Navbar />
    {children}
   </main>
  );
}
