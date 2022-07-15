import "./profile.scss"
import { LocationSearching, MailOutline, PhoneAndroid, Publish } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import { updateUser } from "../../context/admin/userContext/apiCall";
import { UserContext } from "../../context/admin/userContext/UserContext";
import Navbar from "../../components/navbar/Navbar";
import storage from "../../firebase";

const Profile:React.FC = () => {
  const { dispatchUser } = useContext(UserContext);
  const [tempUser, setTempUser] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [uploaded, setUploaded] = useState<any>(0);
  const data:any = localStorage.getItem("user")
  const user: any = JSON.parse(data)
  const handleChange = (e:any) => {
    const value = e.target.value;
    setTempUser({ ...tempUser, _id: user._id, [e.target.name]: value });
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    updateUser(tempUser, dispatchUser);
  }
  console.log(tempUser);

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
          setTempUser((prev:any) => {
            return { ...prev, [item.label]: url };
          });
          setUploaded(1);
        });
      }
    );
  });
};
const handleUpload = (e:any) => {
  e.preventDefault();
  upload([
    { file: profilePic, label: "profilePic" },
  ]);
};

    return (
       <div className="profile">
        <div className="topProfile">
          <Navbar />
        </div>
        <div className="bodyProfile">
          <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Profile</h1>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={user.profilePic}
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user.username}</span>
                  <span className="userShowUserTitle">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">+1 123 456 67</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">VietNam</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={user.username}
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="username"
                    />
                  </div>

                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={user.email}
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="******"
                      className="userUpdateInput"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={user.profilePic}
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} name="profilePic"
            onChange={(e:any) => setProfilePic(e.target?.files[0])} />
                  </div>
                  {uploaded === 1 ? (
          <button className="newUserButton" onClick={handleSubmit}>
            Update
          </button>
        ) : (
          <button className="newUserButton" onClick={handleUpload}>
            Upload
          </button>
        )}
                </div>
              </form>
            </div>
          </div>
        </div>
        </div></div>
      );
}

export default Profile