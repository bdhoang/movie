import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user: any, dispatch: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", user);
     dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};