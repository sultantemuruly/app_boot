import { createContext } from "react";

type ActionState = {
  actionType: string;
  timeStamp: number;
};

export const ActionContext = createContext<ActionState | null>(null);
