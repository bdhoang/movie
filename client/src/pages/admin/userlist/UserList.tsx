import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../../context/admin/userContext/apiCall';
import { UserContext } from '../../../context/admin/userContext/UserContext';
import "./userlist.scss"
const UserList:React.FC = () => {
    const {stateUser,dispatchUser} = useContext(UserContext)
    console.log(stateUser.users);
    
  useEffect(() => {
    getUsers(dispatchUser)
  }, [dispatchUser])

    const handleDelete = (id:any) => {
      deleteUser(id, dispatchUser)
    };
    
    const columns = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "user",
        headerName: "User",
        width: 200,
        renderCell: (params:any) => {
          return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.profilePic} alt="" />
              {params.row.username}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "isAdmin",
        headerName: "isAdmin",
        width: 120,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params:any) => {
          return (
            <>
              <Link to={{pathname:"/admin/users/" + params.row._id}} state={stateUser.users.find((item: any) => item._id === params.row._id)}>
                <button className="userListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div className="userList">
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={stateUser.users}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
        </div>
      </div>
    );
}

export default UserList