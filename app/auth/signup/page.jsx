import Image from "next/image"
import authIllustration from "./authIllustration.png"
import SignupForm from "./signupForm"
const Signup = () => {
  return (
    <section className="w-[90%] mx-auto mt-8 flex flex-col lg:flex-row items-center text-white">
        <div className="lg:w-[55%]">
             <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <SignupForm />
        </div>
    
        <div className="hidden lg:block">
            <Image
            width="100%"
            placeholder="blur"
            alt="signup illustration image"
            src={authIllustration}
            
             />
        </div>
    </section>
  )
}

export default Signup