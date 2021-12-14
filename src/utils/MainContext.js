import { createContext } from "react";

export const MainContext = createContext({
  token: {},
  user: {},
  friends: [],
  entries: [],
});
