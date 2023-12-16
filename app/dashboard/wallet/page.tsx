import WalletForm from "./WalletForm";

const Wallet = () => {
  return (
    <div className="text-white w-[90%] mx-auto">
      <div className="mt-2 lg:mt-8">
        <h2 className="font-bold text-xl lg:text-2xl">My Wallets</h2>
        <ul className="list-disc ml-8 mt-2">
          <li>Wallet 1</li>
          <li>Wallet 2</li>
        </ul>
      </div>
      <WalletForm />
    </div>
  );
};

export default Wallet;
