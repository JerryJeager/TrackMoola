import Image from "next/image";
import Navbar from "./components/ui/Header";
import investment from "./investment2.png";
import Link from "next/link";


export default function Home() {
  return (
    <main className="bg-primary h-screen relative">
      <Navbar />
      <section className="flex items-center justify-between flex-col lg:flex-row pt-14 w-[90%] mx-auto">
        <div className="lg:w-[55%] text-white bg-homeRadialBg4">
          <h2 className="text-3xl lg:text-5xl lg:leading-[60px] font-bold">
            Effortlessly manage your{" "}
            <span className="text-[#E33C3C]">Finances</span>
          </h2>
          <p className="mt-4 text-lg">
            Take control of your budget, track spending, and achieve financial
            goals seamlessly. Your journey to <s>SAPA</s> financial freedom
            starts here.{" "}
          </p>
          <Link href="/auth/login">
            <button className="bg-secondary flex justify-center items-center p-2 w-[190px] rounded-md mt-4">
              Get Started
            </button>
          </Link>
        </div>
        <div>
          <Image
            alt="expense tracker illustration"
            width="100%"
            placeholder="blur"
            src={investment}
          />
        </div>
      </section>
    </main>
  );
}
