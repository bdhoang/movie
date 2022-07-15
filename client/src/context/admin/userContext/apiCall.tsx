import axios from "axios";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserActions";

const value: any = localStorage.getItem("user")


export const getUsers = async (dispatch: any) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://localhost:8800/api/users", {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) { 
    dispatch(getUsersFailure());
  }
};

//create
export const createUser = async (user: any, dispatch :any) => {
    dispatch(createUserStart());
    try {
      const res = await axios.post("http://localhost:8800/api/users", user, {
        headers: {
          token: "Bearer "+JSON.parse(value).accessToken,
        },
      });
      dispatch(createUserSuccess(res.data));
    } catch (err) {
      dispatch(createUserFailure());
    }
  };
  
  //update
  export const updateUser = async (user: any ,dispatch :any) => {
    dispatch(updateUserStart());
    try {
      const res = await axios.put("http://localhost:8800/api/users/"+ user._id,user, {
        headers: {
          token: "Bearer "+JSON.parse(value).accessToken,
        },
      });
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };


  //delete
export const deleteUser = async (id: any, dispatch: any) => {
    dispatch(deleteUserStart());
    try {
      await axios.delete("http://localhost:8800/api/users/" + id, {
        headers: {
          token: "Bearer "+JSON.parse(value).accessToken,
        },
      });
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };