import React, { useContext, useState } from 'react'
import "./movie.scss"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Publish } from '@mui/icons-material';
import { updateMovie } from '../../../context/admin/movieContext/apiCall';
import { MovieContext } from '../../../context/admin/movieContext/MovieContext';
import storage from '../../../firebase';


const Movie:React.FC= () => {
    const location = useLocation();
    const movie: any = location?.state
    const [tmpMovie, setTmpMovie] = useState<any>(null);
    const [img, setImg] = useState<any>(null);
    const [imgTitle, setImgTitle] = useState<any>(null);
    const [imgSm, setImgSm] = useState<any>(null);
    const [trailer, setTrailer] = useState<any>(null);
    const [video, setVideo] = useState<any>(null);
    const [uploaded, setUploaded] = useState<any>(0);
    const { dispatch } = useContext(MovieContext);
    const navigate = useNavigate()
    const handleChange = (e:any) => {
    const value = e.target.value;
    setTmpMovie({ ...tmpMovie, _id:movie._id,[e.target.name]: value });
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        updateMovie(tmpMovie, dispatch);
        navigate("/admin/movies")
    }
    console.log(tmpMovie);
    
    const upload = (items:any) => {
        items.forEach((item:any) => {
          const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setTmpMovie((prev:any) => {
                  return { ...prev, [item.label]: url };
                });
                setUploaded((prev:any) => prev + 1);
              });
            }
          );
        });
      };
    const handleUpload = (e:any) => {
        e.preventDefault();
        upload([
          { file: img, label: "img" },
          { file: imgTitle, label: "imgTitle" },
          { file: imgSm, label: "imgSm" },
          { file: trailer, label: "trailer" },
          { file: video, label: "video" },
        ]);
      };
    return (
      <div className="movie">
        <div className="movieTitleContainer">
          <h1 className="movieTitle">Movie</h1>
          <Link to="/admin/movie/newmovie">
            <button className="movieAddButton">Create</button>
          </Link>
        </div>
        <div className="movieTop">
          <div className="movieTopRight">
            <div className="movieInfoTop">
              <img src={movie.img} alt="" className="movieInfoImg" />
              <span className="movieName">{movie.title}</span>
            </div>
            <div className="movieInfoBottom">
              <div className="movieInfoItem">
                <span className="movieInfoKey">id:</span>
                <span className="movieInfoValue">{movie._id}</span>
              </div>
              <div className="movieInfoItem">
                <span className="movieInfoKey">genre:</span>
                <span className="movieInfoValue">{movie.genre}</span>
              </div>
              <div className="movieInfoItem">
                <span className="movieInfoKey">year:</span>
                <span className="movieInfoValue">{movie.year}</span>
              </div>
              <div className="movieInfoItem">
                <span className="movieInfoKey">limit:</span>
                <span className="movieInfoValue">{movie.limit}</span>
              </div>
              <div className="movieInfoItem">
                <span className="movieInfoKey">duration:</span>
                <span className="movieInfoValue">{movie.duration}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="movieBottom">
          <form className="movieForm">
            <div className="movieFormLeft">
              <label>Movie Title</label>
              <input type="text" placeholder={movie.title} name="title"
            onChange={handleChange} />
              <label>Description</label>
              <input type="text" placeholder={movie.desc} name="desc"
            onChange={handleChange} />
              <label>Year</label>
              <input type="text" placeholder={movie.year} name="year"
            onChange={handleChange} />
              <label>Genre</label>
              <input type="text" placeholder={movie.genre} name="genre"
            onChange={handleChange} />
              <label>Limit</label>
              <input type="text" placeholder={movie.limit} name="limit"
            onChange={handleChange} />
              <label>Duration</label>
              <input type="text" placeholder={movie.duration} name="duration"
            onChange={handleChange}  />
              <label>Trailer</label>
              <input type="file" placeholder={movie.trailer} name="img"
            onChange={(e:any) => setTrailer(e.target?.files[0])}  />
              <label>Video</label>
              <input type="file" placeholder={movie.video} name="img"
            onChange={(e:any) => setVideo(e.target?.files[0])}   />
              <label>Image</label>
              <input type="file" placeholder={movie.img} name="img"
            onChange={(e:any) => setImg(e.target?.files[0])}/>
              <label>Title Image</label>
              <input type="file" placeholder={movie.imgTitle} name="img"
            onChange={(e:any) => setImgTitle(e.target?.files[0])} />
              <label>Thumbnail Image</label>
              <input type="file" placeholder={movie.imgSm} name="img"
            onChange={(e:any) => setImgSm(e.target?.files[0])} />
            </div>
            <div className="movieFormRight">
              <div className="movieUpload">
                <img
                  src={movie.img}
                  alt=""
                  className="movieUploadImg"
                />
                <label htmlFor='file'>
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              {uploaded === 5 ? (
          <button className="addMovieButton" onClick={handleSubmit}>
            Update
          </button>
        ) : (
          <button className="addMovieButton" onClick={handleUpload} disabled>
            Upload
          </button>
        )}
            </div>
          </form>
        </div>
      </div>
    );
}

export default Movie