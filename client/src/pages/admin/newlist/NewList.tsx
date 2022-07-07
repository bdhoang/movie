import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createList } from '../../../context/admin/listContext/apiCall';
import { ListContext } from '../../../context/admin/listContext/ListContext';
import { getMovies } from '../../../context/admin/movieContext/apiCall';
import { MovieContext } from '../../../context/admin/movieContext/MovieContext';
import "./newlist.scss"
const NewList:React.FC = () => {
    const [list, setList] = useState<any>(null);
    const navigate = useNavigate()
  
    const { dispatch } = useContext(ListContext);
    const { state, dispatch: dispatchMovie } = useContext(MovieContext);
  
    useEffect(() => {
      getMovies(dispatchMovie);
    }, [dispatchMovie]);
  
    const handleChange = (e:any) => {
      const value = e.target.value;
      setList({ ...list, [e.target.name]: value });
    };
  
    const handleSelect = (e:any) => {
      let value = Array.from(e.target.selectedOptions, (option:any) => option.value);
      setList({ ...list, [e.target.name]: value });
    };
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      createList(list, dispatch);
     navigate("/admin/lists")
    };
  console.log(list);
  
    return (
      <div className="newList">
        <h1 className="addListTitle">New List</h1>
        <form className="addListForm">
          <div className="formLeft">
            <div className="addListItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Popular Movies"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addListItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder="action"
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="addListItem">
              <label>Type</label>
              <select name="type" onChange={handleChange}>
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
          </div>
          <div className="formRight">
            <div className="addListItem">
              <label>Content</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "280px" }}
              >
                {state.movies.map((movie:any) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="addListButton" onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    );
}

export default NewList