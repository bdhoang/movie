import ListReducer from "./ListReducer";
import { createContext, useReducer,Dispatch } from "react";

const INITIAL_STATE = {
  lists: [],
  isFetching: false,
  error: false,
};
type stateType = {
    lists: string[],
    isFetching: boolean,
    error: boolean
}
export const ListContext:any = createContext<{state:stateType, dispatch: Dispatch<any>}>({
    state: INITIAL_STATE,
    dispatch: () => null
  });
interface Props{
    children: any
}

export const ListContextProvider:React.FC <Props> = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

  return (
    <ListContext.Provider
      value={{
        state: {
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        },
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};