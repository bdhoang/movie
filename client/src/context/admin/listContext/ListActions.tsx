export const getListsStart = () => ({
    type: "GET_LISTS_START",
  });
  
  export const getListsSuccess = (lists:any) => ({
    type: "GET_LISTS_SUCCESS",
    payload: lists,
  });
  
  export const getListsFailure = () => ({
    type: "GET_LISTS_FAILURE",
  });
  
  export const createListStart = () => ({
    type: "CREATE_LIST_START",
  });
  
  export const createListSuccess = (list:any) => ({
    type: "CREATE_LIST_SUCCESS",
    payload: list,
  });
  
  export const createListFailure = () => ({
    type: "CREATE_LIST_FAILURE",
  });
  
  export const updateListStart = () => ({
    type: "UPDATE_LIST_START",
  });
  
  export const updateListSuccess = (movie:any) => ({
    type: "UPDATE_LIST_SUCCESS",
    payload: movie,
  });
  
  export const updateListFailure = () => ({
    type: "UPDATE_LIST_FAILURE",
  });
  
  export const deleteListStart = () => ({
    type: "DELETE_LIST_START",
  });
  
  export const deleteListSuccess = (id:any) => ({
    type: "DELETE_LIST_SUCCESS",
    payload: id,
  });
  
  export const deleteListFailure = () => ({
    type: "DELETE_LIST_FAILURE",
  });