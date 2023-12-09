"use client";

const WalletForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-[50%] mt-8  p-4 bg-whiteP2 backdrop-blur-[40px] rounded-2xl "
    >
      <h3 className="mt-2 font-bold text-tertiary">+ New Wallet</h3>
      <p className="text-gray-400 text-xs mb-4">
        Having multiple wallets let's you monitor expense on multiple accounts.
      </p>
      <div className="flex flex-col gap-4">
        <label>
          <span>Wallet Name </span>
          <input
            type="text"
            className="bg-primary outline-none p-2 lg:ml-8 border-whiteP5 rounded-md"
            placeholder="e.g: Wallet 1"
            required
          />
        </label>
        <label>
          <span>Account Balance </span>
          <input
            type="number"
            className="bg-primary border-whiteP5 rounded-md lg:ml-8 outline-none p-2"
            required
          />
        </label>
      </div>
      <button className="bg-secondary rounded-md p-2 mt-2">Save</button>
    </form>
  );
};

export default WalletForm;
