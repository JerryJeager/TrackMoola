import Image from "next/image"
import authIllustration from "../authIllustration.png"
import LoginForm from "./LoginForm"

const Login = () => {
  return (
    <section className="w-[90%] mx-auto mt-8 flex flex-col lg:flex-row items-center text-white">
        <div className="lg:w-[55%]">
             <h2 className="text-2xl font-bold mb-4">Welcome back, Login</h2>
            <LoginForm />
        </div>
    
        <div>
            <Image
            sizes="(min-width: 1024px) 55vw"
            placeholder="blur"
            alt="signup illustration image"
            src={authIllustration}
            
             />
        </div>
    </section>
  )
}

export default Login