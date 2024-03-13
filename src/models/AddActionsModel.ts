interface AddActionsModel {
  title: string;
  svgPath: string;
  backGroundColor: string;
}

export let AddActionsModels: AddActionsModel[] = [
  { title: "Expence", svgPath: "expence", backGroundColor: "bg-green-50" },
  {
    title: "Subscriptions",
    svgPath: "subscription",
    backGroundColor: "bg-green-50",
  },
  { title: "Transfer", svgPath: "transfer", backGroundColor: "bg-green-50" },
];
