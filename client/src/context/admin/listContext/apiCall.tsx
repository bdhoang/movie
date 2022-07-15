import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListActions";
const value:any = localStorage.getItem("user")
export const getLists = async (dispatch:any) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

// update

export const updateList = async (list: any ,dispatch :any) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put("http://localhost:8800/api/lists/"+ list._id,list, {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};

//create
export const createList = async (list:any, dispatch:any) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/lists", list, {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//delete
export const deleteList = async (id:any, dispatch:any) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("http://localhost:8800/api/lists/" + id, {
      headers: {
        token: "Bearer "+JSON.parse(value).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};