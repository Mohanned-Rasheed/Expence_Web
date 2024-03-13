import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "./Transaction/TransactionSlice";
import userSlice from "./Firebase/userSlice";

export const store = configureStore({
  reducer: { transaction: TransactionReducer, user: userSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
