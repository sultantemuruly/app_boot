import { createContext } from "react";

type UserDetailType = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
};

type UserDetailContextType = {
  messages: UserDetailType;
  setMessages: React.Dispatch<React.SetStateAction<UserDetailType>>;
};

export const UserDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);
