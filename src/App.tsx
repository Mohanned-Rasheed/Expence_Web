import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AddTransaction from "./pages/AddTransactionPage.tsx";
import AllTranPage from "./pages/AllTranPage.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store.ts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config.ts";
import { setUser } from "./state/Firebase/userSlice.ts";
import { useState } from "react";
import Loader from "./components/Loader.tsx";

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
  const user = useSelector((state: RootState) => state.user);
  return isLodaing ? (
    <BrowserRouter>
      {user.currentUser ? (
        <Routes>
          <Route path="*" element={<HomePage />}></Route>
          <Route path="/addTransaction" element={<AddTransaction />}></Route>
          <Route path="/AllTransactionsPage" element={<AllTranPage />}></Route>
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
