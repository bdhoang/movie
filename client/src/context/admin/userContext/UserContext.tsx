import UserReducer from "./UserReducer";
import { createContext, useReducer,Dispatch } from "react";

const INITIAL_STATE = {
  users: [],
  isFetching: false,
  error: false,
};

type stateType = {
    users: string[],
    isFetching: boolean,
    error: boolean
}

export const UserContext : any = createContext<{stateUser:stateType, dispatchUser: Dispatch<any>}> ({
    stateUser: INITIAL_STATE,
    dispatchUser: () => null
  });
interface Props{
    children: any
}
export const UserContextProvider: React.FC <Props> = ({ children }) => {
  const [stateUser, dispatchUser] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        stateUser: {
        users: stateUser.users,
        isFetching: stateUser.isFetching,
        error: stateUser.error,
        },
        dispatchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};