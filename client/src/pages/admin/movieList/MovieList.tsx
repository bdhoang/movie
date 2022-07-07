import React, { useContext, useEffect } from 'react'
import "./movielist.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../../datasource';
import { MovieContext } from '../../../context/admin/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../../context/admin/movieContext/apiCall';
import { Link } from 'react-router-dom';




const MovieList = () => {
  const {state,dispatch} = useContext(MovieContext)

  useEffect(() => {
    getMovies(dispatch)
  }, [dispatch])
  console.log(state.movies);
  
  const handleDelete = (id: any) => {
   deleteMovie(id, dispatch)
  }
    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params:any) => {
            return (
              <div className="cellAction">
                    <Link to={{pathname:"/admin/movie/" + params.row._id}} state={state.movies.find((item: any) => item._id === params.row._id)}>
                    <div className="viewButton">
                    View
                    </div>
                    </Link>
                     <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
                     Delete
                     </div>
              </div>
            );
          },
        },
      ];
  return (
    <div className='datatable'>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={state.movies}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
       disableSelectionOnClick
       getRowId={(r) => r._id}
      />
    </div> 
    </div>
  )
}

export default MovieList