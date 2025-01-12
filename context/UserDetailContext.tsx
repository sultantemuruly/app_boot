import { createContext } from "react";

type UserDetailType = {
  email: string;
  name: string;
  picture: string;
  uid: string;
};

type UserDetailContextType = {
  messages: UserDetailType;
  setMessages: React.Dispatch<React.SetStateAction<UserDetailType>>;
};

export const UserDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);
