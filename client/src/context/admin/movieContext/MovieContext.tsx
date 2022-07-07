import MovieReducer from "./MovieReducer";
import { createContext, useReducer,Dispatch } from "react";

const INITIAL_STATE = {
  movies: [],
  isFetching: false,
  error: false,
};

type stateType = {
    movies: string[],
    isFetching: boolean,
    error: boolean
}

export const MovieContext : any = createContext<{state:stateType, dispatch: Dispatch<any>}> ({
    state: INITIAL_STATE,
    dispatch: () => null
  });
interface Props{
    children: any
}
export const MovieContextProvider: React.FC <Props> = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

  return (
    <MovieContext.Provider
      value={{
        state: {
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        },
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};