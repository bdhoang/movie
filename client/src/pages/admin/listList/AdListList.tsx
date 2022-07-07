import React from 'react'
import "./adlistlist.scss"
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from '../../../context/admin/listContext/ListContext';
import { getLists,deleteList} from '../../../context/admin/listContext/apiCall';
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const AdListList:React.FC = () => {
    const { state, dispatch } = useContext(ListContext);
    console.log(state.lists);
    
    useEffect(() => {
      getLists(dispatch);
    }, [dispatch]);
  
    const handleDelete = (id:any) => {
      deleteList(id, dispatch);
    };
  
    const columns = [
      { field: "_id", headerName: "ID", width: 250 },
      { field: "title", headerName: "title", width: 250 },
      { field: "genre", headerName: "Genre", width: 150 },
      { field: "type", headerName: "type", width: 150 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params:any) => {
          return (
            <>
              <Link
                to={{ pathname: "/admin/lists/" + params.row._id }} state={state.lists.find((item: any) => item._id === params.row._id)}
              >
                <button className="listListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="listListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div className="listList">
       <div  style={{ height: 500, width: '100%' }}>
       <DataGrid
          rows={state.lists}
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

export default AdListList