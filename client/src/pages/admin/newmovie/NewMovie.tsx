import React , {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../../../context/admin/movieContext/apiCall';
import { MovieContext } from '../../../context/admin/movieContext/MovieContext';
import storage from '../../../firebase';
import "./newmovie.scss"


const NewMovie:React.FC = () => {
    const [movie, setMovie] = useState<any>(null);
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
    setMovie({ ...movie, [e.target.name]: value });
    }


    const handleSubmit = (e:any) => {
        e.preventDefault();
        createMovie(movie, dispatch);
        navigate("/admin/movies")
    }

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
                setMovie((prev:any) => {
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
      console.log(movie)
  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e:any) => setImg(e.target?.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e:any) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e:any) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addMovieItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e:any) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e:any) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addMovieButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addMovieButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  )
}

export default NewMovie