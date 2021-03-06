const MovieReducer = (stateUser : any, action: any) => {
    switch (action.type) {
      case "GET_MOVIES_START":
        return {
          movies: [],
          isFetching: true,
          error: false,
        };
      case "GET_MOVIES_SUCCESS":
        return {
          movies: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_MOVIES_FAILURE":
        return {
          movies: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_MOVIE_START":
        return {
          ...stateUser,
          isFetching: true,
          error: false,
        };
      case "CREATE_MOVIE_SUCCESS":
        return {
          movies: [...stateUser.movies, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_MOVIE_FAILURE":
        return {
          ...stateUser,
          isFetching: false,
          error: true,
        };
      case "UPDATE_MOVIE_START":
        return {
          ...stateUser,
          isFetching: true,
          error: false,
        };
      case "UPDATE_MOVIE_SUCCESS":
        return {
          movies: stateUser.movies.map(
            (movie: any) => movie._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPDATE_MOVIE_FAILURE":
        return {
          ...stateUser,
          isFetching: false,
          error: true,
        };
      case "DELETE_MOVIE_START":
        return {
          ...stateUser,
          isFetching: true,
          error: false,
        };
      case "DELETE_MOVIE_SUCCESS":
        return {
          movies: stateUser.movies.filter((movie: any) => movie._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_MOVIE_FAILURE":
        return {
          ...stateUser,
          isFetching: false,
          error: true,
        };
      default:
        return { ...stateUser };
    }
  };
  
  export default MovieReducer;