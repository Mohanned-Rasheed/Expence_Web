import Header from "../components/Header";
import AddActions from "../components/AddActionsList";
import TranscationsList from "../components/TranscationsList";
import Chart from "../components/ChartComponent";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getTransactionFromDB } from "../state/Transaction/TransactionSlice.ts";
import { auth, db } from "../firebase/config.ts";
import { useDispatch } from "react-redux";
interface Props {}

function HomePage(props: Props) {
  const {} = props;
  const dispatch = useDispatch();
  const getTransaction = async () => {
    const querySnapshot = await getDocs(collection(db, "Transactions"));
    const queryData = querySnapshot.docs;
    queryData.map((t) => {
      if (t.id === auth.currentUser?.uid) {
        let data = t.data();
        dispatch(getTransactionFromDB(data));
      }
    });
  };
  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="bg-slate-300 min-h-[100vh] max-lg:pb-[5vh] ">
      <Header />
      <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-20 gap-8 mt-[10vh] mx-10 ">
        <AddActions />
        <Chart />
        <TranscationsList />
      </div>
    </div>
  );
}

export default HomePage;
