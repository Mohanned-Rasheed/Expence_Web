import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionModel } from "../../models/TransactionsModel";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
const initTransaction: TransactionModel[] = [
  // {
  //   svgPah: "expence",
  //   title: "food",
  //   date: new Date(),
  //   cost: 100,
  // },
  // {
  //   svgPah: "subscription",
  //   title: "shirt",
  //   date: new Date(),
  //   cost: 100,
  // },
  // {
  //   svgPah: "transfer",
  //   title: "bruh",
  //   date: new Date("2024-02-22 14:10:28.016582"),
  //   cost: 100,
  // },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "shop",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "shirt",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "pants",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "soda",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "jucie",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "latest",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "jango",
  //     date: new Date(),
  //     cost: 100,
  //   },
  //   {
  //     svgPah: EXPENSEsvg,
  //     title: "loot",
  //     date: new Date(),
  //     cost: 100,
  //   },
];

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initTransaction,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionModel>) => {
      state.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      const index = state.findIndex((t) => action.payload.title === t.title);
      state = [...state.splice(index, 1)];
    },
    getTransactionFromDB: (state, action) => {
      state.splice(0, state.length);
      let transactonDB: TransactionModel[] = [];
      let title = action.payload.name;
      let cost = action.payload.cost;
      let svgPah = action.payload.svgPath;
      let date = action.payload.date;
      for (let i = 0; i < date.length; i++) {
        transactonDB.push({
          title: title[i].toString(),
          cost: parseFloat(cost[i]),
          svgPah: svgPah[i],
          date: new Date(date[i]),
        });
      }
      for (let i = 0; i < transactonDB.length; i++) {
        state.push(transactonDB[i]);
      }
    },
    logout: (state) => {
      state.slice(0, state.length);
    },
    updateDB: (state) => {
      let svgPah: string[] = [];
      let title: string[] = [];
      let date: string[] = [];
      let cost: string[] = [];

      state.forEach((t) => {
        svgPah.push(t.svgPah);
        title.push(t.title);
        date.push(
          t.date.getFullYear().toString() +
            "-" +
            (t.date.getMonth() + 1).toString() +
            "-" +
            (t.date.getDay() + 3).toString()
        );
        cost.push(t.cost.toString());
      });

      if (state.length <= 1) {
        setDoc(doc(db, "Transactions", auth.currentUser!.uid.toString()), {
          cost: cost,
          name: title,
          date: date,
          svgPath: svgPah,
        });
      } else {
        updateDoc(doc(db, "Transactions", auth.currentUser!.uid.toString()), {
          cost: cost,
          name: title,
          date: date,
          svgPath: svgPah,
        });
      }
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  getTransactionFromDB,
  logout,
  updateDB,
} = transactionSlice.actions;

export default transactionSlice.reducer;
