import TRANSFERsvg from "../assets/transaction-svgrepo-com.svg";
import SUBSCRIPTIONsvg from "../assets/recurring-subscription-icon.svg";
import EXPENSEsvg from "../assets/money-check-dollar-svgrepo-com.svg";
export interface TransactionModel {
  svgPah: string;
  title: string;
  date: Date;
  cost: number;
}

interface TypeTransaction {
  expence: string;
  subscription: string;
  transfer: string;
}
const TypeTransaction = new Map();
TypeTransaction.set("expence", EXPENSEsvg);
TypeTransaction.set("subscription", SUBSCRIPTIONsvg);
TypeTransaction.set("transfer", TRANSFERsvg);
export default TypeTransaction;
