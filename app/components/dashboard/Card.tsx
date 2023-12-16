import { useState, useEffect } from "react";
import { getRandomHex } from "../../lib/helpers/randomHex";


type TransactionCardProps = {
  expense: string
  category: string
  date: string
  amount: string
}


const TransactionCard = ({expense, category, date, amount}: TransactionCardProps) => {
  const [randomHexValue, setRandomHexValue] = useState<string | null>(null);

  useEffect(() => {
    const color = getRandomHex();
    // console.log(color);
    setRandomHexValue(color);
  }, []);
  return (
    <>
      {randomHexValue && (
        <div className="flex ">
          <div className="w-[98%]  px-4 py-4 bg-lightBlue rounded-l-[30px] flex justify-between items-center">
            <div className="flex gap-2">
                <div className="rounded-full bg-tertiary flex justify-center items-center w-[40px] h-[40px] text-white">
                    {category[0]}
                </div>
                <div className="text-white">
                    <p>{expense}</p>
                    <p className="text-[10px]">Category: <span className="text-tertiary">{category}</span></p>
                    <p className="text-[8px] text-slate-400 mt-2">{date}</p>
                </div>
            </div>
            <div className="border-whiteP5 border-[1px] flex justify-center items-center py-2 px-1 rounded-lg text-secondary text-sm">
                -${amount}
            </div>
          </div>
          <div
            style={{ backgroundColor: `#${randomHexValue}` }}
            className={`w-[2%] py-4 rounded-r-[5px]`}
          ></div>
        </div>
      )}
    </>
  );
};

export default TransactionCard;
