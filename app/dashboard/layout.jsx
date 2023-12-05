import Navbar from "../components/dashboard/Navbar";




export default function RootLayout({ children }) {
  return (
    <main className="bg-primary h-screen">
        {children}
        <Navbar />
    </main>
  );
}