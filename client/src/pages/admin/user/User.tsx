import {  LocationSearching, MailOutline, PhoneAndroid, Publish } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../../context/admin/userContext/apiCall';
import { UserContext } from '../../../context/admin/userContext/UserContext';
import "./user.scss"
const User:React.FC = () => {
  const location = useLocation();
  const user: any = location?.state
  const { dispatchUser } = useContext(UserContext);
  const [tempUser, setTempUser] = useState<any>(null);
  const navigate = useNavigate()
  
  const handleChange = (e:any) => {
    const value = e.target.value;
    setTempUser({ ...tempUser, _id: user._id, [e.target.name]: value });
  }
  const handleUpdate = (e:any) => {
    e.preventDefault();
    updateUser(tempUser, dispatchUser);
    navigate("/admin/users")
  }
  console.log(tempUser);
  
    return (
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
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
                  <label>Status</label>
                  <select name="status" id="status" onChange={handleChange}>
                <option value="false">No</option>
                 <option value="true">Yes</option>
               </select>
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
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default User