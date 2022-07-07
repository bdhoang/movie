import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MovieActions";
const value: any = localStorage.getItem("user")


export const getMovies = async (dispatch: any) => {
  dispatch(getMoviesStart());
  try {
    console.log(value);
    const res = await axios.get("http://localhost:8800/api/movies", {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//create
export const createMovie = async (movie: any, dispatch :any) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("http://localhost:8800/api/movies", movie, {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//delete
export const deleteMovie = async (id: any, dispatch: any) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("http://localhost:8800/api/movies/" + id, {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};