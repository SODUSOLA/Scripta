import { createContext } from "react";

export interface User {
  email: string;
  username?: string;
}

export const UserContext = createContext<User | null>(null);
