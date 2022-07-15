import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { updateList } from '../../../context/admin/listContext/apiCall';
import { ListContext } from '../../../context/admin/listContext/ListContext';
import { getMovies } from '../../../context/admin/movieContext/apiCall';
import { MovieContext } from '../../../context/admin/movieContext/MovieContext';
import "./adlist.scss"

const AdList:React.FC = () => {
    const location = useLocation();
    const list:any = location?.state;
    const { state, dispatch: dispatchMovie } = useContext(MovieContext);
    const { dispatch} = useContext(ListContext);
    const [tempList, setTempList] = useState<any>(null);

    useEffect(() => {
      getMovies(dispatchMovie);
    }, [dispatchMovie]);
    const handleChange = (e:any) => {
      const value = e.target.value;
      setTempList({ ...tempList, _id: list._id, [e.target.name]: value });
    }
    const handleUpdate = (e:any) => {
      e.preventDefault();
      updateList(tempList, dispatch);
    }
    const handleSelect = (e:any) => {
      let value = Array.from(e.target.selectedOptions, (option:any) => option.value);
      setTempList({ ...tempList, [e.target.name]: value });
    };
    return (
      <div className="list">
        <div className="listTitleContainer">
          <h1 className="listTitle">List</h1>
          <Link to="/admin/lists/newlist">
            <button className="listAddButton">Create</button>
          </Link>
        </div>
        <div className="listTop">
          <div className="listTopRight">
          <div style={{flex:1}}>
          <div className="listInfoTop">
            <span className="listInfoKey">List Title:</span>
              <span className="listName">{list.title}</span>
            </div>
            <div className="listInfoBottom">
              <div className="listInfoItem">
                <span className="listInfoKey">Id:</span>
                <span className="listInfoValue">{list._id}</span>
              </div>
              <div className="listInfoItem">
                <span className="listInfoKey">Genre:</span>
                <span className="listInfoValue">{list.genre}</span>
              </div>
              <div className="listInfoItem">
                <span className="listInfoKey">Type:</span>
                <span className="listInfoValue">{list.type}</span>
              </div>
              <div className="listInfoItem">
                <span className="listInfoKey">Amount movies:</span>
                <span className="listInfoValue">{list.content.length}</span>
              </div>
            </div>
          </div>

          <div className="addListItem" style={{height:200,marginLeft:-3,flex:1}}>
              <label>Movies Title</label>
              <select
                multiple
                name="content"
                style={{ height: 200 }}
              >
                {state.movies.map((movie:any) => (
                   <>
                    {list.content.find((id:any) => id === movie._id) &&  <option key={movie._id} > {movie.title}</option> }</>
                ))}
              </select>
            </div>
          </div>
          
        </div>
        <div className="listBottom">
        <div className="newList">
        <h1 className="addListTitle">Update List</h1>
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
              <select name="type" onChange={handleChange} >
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
          </div>
          <div className="formRight">
            <div className="addListItem">
              <label>Movies Title</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "200px" }}
              >
                {state.movies.map((movie:any) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="addListButton" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
        </div>
      </div>
    );
}

export default AdList