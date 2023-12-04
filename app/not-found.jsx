import Image from "next/image";
import notFound from "./notFound.png";
import Navbar from "./components/Navbar";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-primary h-screen">
      <Navbar />
      <div className="mt-8 flex flex-col gap-8 w-[90%] mx-auto">
        <Image
          alt="not-found image"
          src={notFound}
          placeholder="blur"
          width={250}
          className="self-center"
        />
        <div className="bg-homeRadialBg4 lg:w-[60%]">
          <h2 className="text-white lg:text-3xl font-bold mt-4">
            Oops! We can't find the page you're looking for
          </h2>

          <Link href="/">
            <button className="bg-[#e3823c] text-white flex justify-center items-center w-[180px] rounded-md mt-4 lg:mt-8 p-2">
              Go back Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
