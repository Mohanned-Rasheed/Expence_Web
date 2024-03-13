import HISTORYsvg from "../assets/history-svgrepo-com.svg";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import TypeTransaction from "../models/TransactionsModel";
import { motion } from "framer-motion";

interface Props {}

function TranscationsList(props: Props) {
  const {} = props;

  const formarter = Intl.DateTimeFormat("en-US");
  //console.log(formarter.format(now));
  //console.log(formarter.format(now.getDate()));

  const currencyFormat = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const transactions = useSelector((state: RootState) => state.transaction);
  const nav = useNavigate();
  const goToAllTran = () => {
    nav("/AllTransactionsPage");
  };

  // console.log(HISTORYsvg);

  return (
    <>
      <motion.div
        initial={{ x: 800 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className=" flex flex-col select-none xl:col-span-3 max-md:row-start-2 min-h-[30vh] bg-white border-2 border-black rounded-md"
      >
        <section className="min-h-[8vh] mt-[3vh] border-b-2 border-black ">
          <div className="font-bold flex flex-row gap-4 justify-center items-center">
            <img src={HISTORYsvg} width={35} />
            <text> Your Transactions History</text>
          </div>
        </section>

        {transactions
          .slice()
          .reverse()
          .slice(0, 5)
          .map((t) => {
            return (
              <section className="min-h-[10vh] bg-orange-200 flex flex-row items-center justify-between border-b border-black">
                <div className="flex gap-4 ml-[2vw]">
                  <img src={TypeTransaction.get(t.svgPah)} width={35} />
                  <div className="flex flex-col">
                    <text>
                      {t.title.toUpperCase().charAt(0) + t.title.slice(1)}
                    </text>
                    <text className="text-sm pt-2">
                      {" "}
                      {formarter.format(t.date)}
                    </text>
                  </div>
                </div>
                <div className="mr-[2vw]">
                  <text>{currencyFormat.format(t.cost)}</text>
                </div>
              </section>
            );
          })}

        <div
          onClick={goToAllTran}
          className="hover:opacity-60 cursor-pointer mt-auto mb-5 pt-4 flex justify-center border-t-2 border-black  "
        >
          {" "}
          View All Transcations
        </div>
      </motion.div>
    </>
  );
}

export default TranscationsList;
