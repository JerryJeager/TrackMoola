import Link from "next/link"

const NewUser = () => {
  return (
    <div className="mx-auto mt-4 w-[90%]">
        <h2 className="mb-4 text-2xl font-bold text-secondary ">You have not created a Wallet yet</h2>

        <Link href="/dashboard/wallet" className="p-2  rounded-lg text-center bg-tertiary text-white ">Create Wallet</Link>
    </div>
  )
}

export default NewUser