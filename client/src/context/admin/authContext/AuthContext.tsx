import AuthReducer from "./AuthReducer";
import { createContext, Dispatch, useEffect, useReducer } from "react";

const value:any = localStorage.getItem("user") 
const INITIAL_STATE = {
  user: JSON.parse(value) || null,
  isFetching: false,
  error: false,
};

type stateType = {
    user: string,
    isFetching: boolean,
    error: boolean
}

export const AuthContext:any = createContext<{state:stateType, dispatch: Dispatch<any>}> ({
    state: INITIAL_STATE,
    dispatch: () => null
  });
interface Props{
    children: any
}
export const AuthContextProvider:React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
       state: {user: state.user,
        isFetching: state.isFetching,
        error: state.error,},
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};