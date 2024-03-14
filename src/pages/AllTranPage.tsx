import { useState } from "react";
import HISTORYsvg from "../assets/history-svgrepo-com.svg";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  deleteTransaction,
  updateDB,
} from "../state/Transaction/TransactionSlice";
import TypeTransaction, { TransactionModel } from "../models/TransactionsModel";
import { motion } from "framer-motion";

interface Props {}

function ViewAllTranPAge(props: Props) {
  const {} = props;
  const dispatch = useDispatch();
  const formarter = Intl.DateTimeFormat("en-US");
  const currencyFormat = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  let transactions = useSelector((state: RootState) => state.transaction);
  let [transactionFiltered, setTransactionFiltered] = useState<
    TransactionModel[]
  >([]);
  let [feedback, setFeedback] = useState(false);
  let [showedItems, setShowedItems] = useState(5);
  let [showDialog, setShowDialog] = useState(false);
  let [transactionHolder, setTransactionHolder] = useState<TransactionModel>();
  const filterTransaction = (filteredTitle: string) => {
    setTransactionFiltered([]);
    if (filteredTitle === "") {
      return;
    }
    transactions.forEach((t) => {
      if (t.title.includes(filteredTitle)) {
        setTransactionFiltered((preVal) => [...preVal, t]);
      }
    });
  };

  const LoadMore = () => {
    setShowedItems((PreVal) => PreVal + 3);
  };
  const deleteTransactionFunction = (title: any) => {
    dispatch(deleteTransaction({ title: title }));
  };
  return (
    <div className=" select-none relative bg-slate-300 min-h-[100vh]  ">
      <Header />
      {feedback ? (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          className="absolute top-[15%] right-[1%] px-10 py-5 rounded-lg bg-white w-fit"
        >
          Transaction Has Been Deleted
        </motion.div>
      ) : null}
      {showDialog ? (
        <dialog className=" font-bold absolute top-[40%] border-2 border-black h-24 w-96 rounded-xl flex flex-col gap-6 justify-center items-center">
          Are you Sure Want to Delete this Transaction
          <div className="flex gap-10">
            <button
              onClick={() => {
                deleteTransactionFunction(transactionHolder?.title);
                setShowDialog(false);
                setTransactionFiltered([]);
                dispatch(updateDB());

                setTimeout(() => {
                  setFeedback(true);
                }, 250);

                setTimeout(() => {
                  setFeedback(false);
                }, 2000);
              }}
              className="text-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setTransactionHolder(undefined);
                setShowDialog(false);
              }}
            >
              Canel
            </button>
          </div>
        </dialog>
      ) : null}
      <div className="px-5 pb-12 mt-12 flex justify-center items-center h-full w-full ">
        <motion.div
          initial={{ y: -800 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="border-2 border-black rounded-xl shadow-2xl w-[800px] bg-white"
        >
          <section className="min-h-[8vh] mt-[3vh] border-b-2 border-black ">
            <div className="font-bold flex flex-row gap-4 justify-center items-center">
              <img src={HISTORYsvg} width={35} />
              <text> Your Transactions History</text>
            </div>
            <div className="font-bold rounded-3xl flex items-center justify-center w-full mt-4">
              <input
                onChange={(input) => {
                  filterTransaction(input.target.value);
                }}
                className="max-md:px-10 px-20 text-center h-10 outline-none border-2 rounded-lg"
                placeholder="Search A Transaction"
              ></input>
            </div>
            <div className="flex justify-center text-xs text-red-500 my-2">
              Double Click To Delete A Tranasction
            </div>
          </section>

          {transactions.length > 0 ? (
            transactionFiltered.length < 1 ? (
              transactions
                .slice()
                .reverse()
                .slice(0, showedItems)
                .map((t) => {
                  return (
                    <section
                      onDoubleClick={() => {
                        setTransactionHolder(t);
                        setShowDialog(true);
                      }}
                      className=" min-h-[10vh] bg-orange-200 flex flex-row items-center justify-between border-b border-black"
                    >
                      <div className="flex gap-4 ml-[2vw] ">
                        <img src={TypeTransaction.get(t.svgPah)} width={35} />
                        <div className="flex flex-col">
                          <text>
                            {t.title.toUpperCase().charAt(0) + t.title.slice(1)}
                          </text>
                          <text className="text-sm pt-1">
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
                })
            ) : (
              transactionFiltered.map((t) => {
                return (
                  <section
                    onDoubleClick={() => {
                      setTransactionHolder(t);
                      setShowDialog(true);
                    }}
                    className=" min-h-[10vh] bg-orange-200 flex flex-row items-center justify-between border-b border-black"
                  >
                    <div className="flex gap-4 ml-[2vw]">
                      <img src={TypeTransaction.get(t.svgPah)} width={35} />
                      <div className="flex flex-col">
                        <text>
                          {t.title.toUpperCase().charAt(0) + t.title.slice(1)}
                        </text>
                        <text className="text-sm pt-1">
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
              })
            )
          ) : (
            <div className="py-12 flex justify-center font-bold text-xl">
              There is No Transaction To Show
            </div>
          )}

          <div
            onClick={LoadMore}
            className="cursor-pointer mt-auto mb-5 pt-4 flex justify-center border-t-2 border-black  "
          >
            {" "}
            Load More
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ViewAllTranPAge;
