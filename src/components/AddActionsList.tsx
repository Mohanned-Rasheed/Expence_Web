import { AddActionsModels } from "../models/AddActionsModel.ts";
import { useNavigate } from "react-router-dom";
import TypeTransaction from "../models/TransactionsModel.ts";
import { motion } from "framer-motion";
interface Props {}

function AddActions(props: Props) {
  const {} = props;
  let navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -800 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="select-none font-bold flex flex-col max-xl:pb-10 max-xl:min-h-fit xl:col-span-3 min-h-[75vh] bg-white border-2 border-black rounded-md"
    >
      <section className="flex flex-col items-center ">
        <div className="border-b-2 border-black min-h-[11vh] w-full flex items-center justify-center">
          {" "}
          Add a Transaction
        </div>
        {AddActionsModels.map((t) => {
          return (
            <div
              onClick={() => {
                navigate("/Expence_Web/addTransaction", {
                  state: {
                    svg: t.svgPath,
                    title: t.title,
                  },
                });
              }}
              className={`hover:bg-green-100 flex max-md:justify-center gap-8 items-center min-h-[10vh] min-w-[100%] border-b cursor-pointer ${t.backGroundColor} `}
            >
              <img
                className="ml-[1vw] w-11"
                src={TypeTransaction.get(t.svgPath)}
              />
              <text className="select-none "> {t.title}</text>
            </div>
          );
        })}
      </section>
      <div className="mt-auto mb-10 flex justify-center opacity-60 max-xl:hidden">
        All Rights Reserved © 2024{" "}
      </div>
    </motion.div>
  );
}

export default AddActions;
