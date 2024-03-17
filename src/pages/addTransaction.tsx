import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTransaction,
  updateDB,
} from "../state/Transaction/TransactionSlice";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

interface Props {}
function AddTransaction(props: Props) {
  let navigate = useNavigate();
  const {} = props;
  interface transaction {
    title: string;
    cost: number;
  }
  let [feedback, setFeedback] = useState(false);
  let [costError, setCostError] = useState("");
  let [newTransaction, setNewTransaction] = useState<transaction>({
    title: "",
    cost: 0,
  });
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div
      onLoad={() => {
        if (location.state.title == null) {
          navigate("/");
        }
      }}
      className=" relative bg-slate-300 min-h-[100vh] max-lg:pb-[5vh] "
    >
      <Header />
      {feedback ? (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          className="absolute top-[15%] right-[1%] px-10 py-5 rounded-lg bg-white w-fit"
        >
          Transaction Has Been Added
        </motion.div>
      ) : null}
      <div className="h-[85vh] w-[100%] flex justify-center items-center">
        <div className="shadow-2xl bg-white h-[50vh] w-[18rem] md:w-[35rem] border-2 border-black flex justify-center items-center rounded-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newTransaction.cost > 0) {
                dispatch(
                  addTransaction({
                    svgPah: location.state.svg,
                    title: newTransaction.title,
                    date: new Date(),
                    cost: newTransaction.cost,
                  })
                );
                dispatch(updateDB());
                setNewTransaction({
                  title: "",
                  cost: 0,
                });
                setTimeout(() => {
                  setFeedback(true);
                }, 500);
                setTimeout(() => {
                  navigate("/Expence_Web/");

                  setFeedback(false);
                  setCostError("");
                }, 2000);
              } else {
                setCostError("Please Enter Numbers Only");
              }
            }}
            className="h-[100%] w-full mx-4 flex flex-col justify-around"
          >
            <div className="border-b-2 pb-4 text-center text-xl font-bold">
              Add New{" "}
              <text className="text-blue-500 ">{location.state.title}</text>{" "}
              Transaction
            </div>
            <div>
              {" "}
              <label className=" flex flex-col mb-6 font-bold px-6">
                Title
                <input
                  required
                  onChange={(input) => {
                    setNewTransaction({
                      ...newTransaction,
                      title: input.target.value,
                    });
                  }}
                  value={newTransaction.title}
                  className="outline-none border-2 rounded-md h-12 pl-4 font-medium"
                  type="text"
                  placeholder="New Title For Transaction"
                />
              </label>
              <label className="flex flex-col  font-bold px-6">
                Cost
                <input
                  onChange={(input) => {
                    setNewTransaction({
                      ...newTransaction,
                      cost: parseFloat(input.target.value),
                    });
                  }}
                  className="outline-none border-2 rounded-md h-12 pl-4 font-medium"
                  type="text"
                  placeholder="New Cost For Transaction "
                />
                <text className="ml-5 text-xs pt-1 text-red-600 ">
                  {costError}
                </text>
              </label>
            </div>
            <button className="mx-32 bg-green-300 py-1 rounded-xl font-bold">
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
