import { useState } from "react";
import TransactionChart from "./TransactionChart";
import { motion } from "framer-motion";
interface Props {}

function Chart(props: Props) {
  const {} = props;
  let [slectedMonth, setSlectedMonth] = useState(6);
  return (
    <motion.div
      initial={{ x: -1800 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="select-none font-bold bg-white border-2 border-black rounded-md  h-[75vh] xl:col-span-6  "
    >
      <div className=" max-md:text-[10px] h-[12vh] mt-[5vh] max-md:ml-4 ml-14 mr-4 max-md:gap-2 gap-8 flex">
        <button
          onClick={() => setSlectedMonth(3)}
          className="hover:bg-blue-200 h-14 bg-blue-100 max-sm:px-2 px-10 rounded-lg"
        >
          3 Month{" "}
        </button>
        <button
          onClick={() => setSlectedMonth(6)}
          className="hover:bg-blue-200 h-14 bg-blue-100 max-sm:px-2  px-10 rounded-lg"
        >
          6 Month{" "}
        </button>
        <button
          onClick={() => setSlectedMonth(12)}
          className="hover:bg-blue-200 h-14 bg-blue-100 max-sm:px-2  px-10 rounded-lg"
        >
          1 Year{" "}
        </button>
      </div>
      <TransactionChart selectedQuarter={slectedMonth} />
    </motion.div>
  );
}

export default Chart;
