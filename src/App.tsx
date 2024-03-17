import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AddTransaction from "./pages/addTransaction.tsx";
import AllTranPage from "./pages/AllTransactionsPage.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store.ts";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config.ts";
import { setUser } from "./state/Firebase/userSlice.ts";
import { useState } from "react";
import Loader from "./components/Loader.tsx";
import { doc, getDoc } from "firebase/firestore";
import { getTransactionFromDB } from "./state/Transaction/TransactionSlice.ts";

function App() {
  let [isLodaing, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
    if (!isLodaing) {
      setIsLoading(true);
    }
  });

  const getTransaction = async () => {
    const docRef = doc(db, "Transactions", auth.currentUser!.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      dispatch(getTransactionFromDB(data));
    } else {
      console.log("No such document!");
    }
    // const querySnapshot = await getDocs(collection(db, "Transactions"));
    // const queryData = querySnapshot.docs;
    // queryData.map((t) => {
    //   if (t.id === auth.currentUser?.uid) {
    //     let data = t.data();
    //     dispatch(getTransactionFromDB(data));
    //   }
    // });
  };
  getTransaction();

  const user = useSelector((state: RootState) => state.user);
  return isLodaing ? (
    <BrowserRouter basename="/Expence_Web">
      {user.currentUser ? (
        <Routes>
          <Route path="*" Component={HomePage}></Route>
          <Route
            path="/Expence_Web/addTransaction"
            Component={AddTransaction}
          ></Route>
          <Route
            path="/Expence_Web/AllTransactionsPage"
            Component={AllTranPage}
          ></Route>
        </Routes>
      ) : (
        <LoginPage />
      )}
    </BrowserRouter>
  ) : (
    <Loader></Loader>
  );
}

export default App;
