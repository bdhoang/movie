import React, { useContext, useState } from 'react'
import { createUser } from '../../../context/admin/userContext/apiCall';
import { UserContext } from '../../../context/admin/userContext/UserContext';
import "./newuser.scss"
import storage from '../../../firebase';
const NewUser:React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [uploaded, setUploaded] = useState<any>(0);
  const { dispatchUser } = useContext(UserContext);
  const handleOnChange = (e:any) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    createUser(user, dispatchUser);
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
          setUser((prev:any) => {
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
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name='username' onChange={handleOnChange}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" onChange={handleOnChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name='email' onChange={handleOnChange}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name='password' onChange={handleOnChange}/>
        </div>
        <div className="newUserItem">
          <label>isAdmin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmins ">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label htmlFor='profilePic'>ProfilePic</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={(e:any) => setProfilePic(e.target?.files[0])}
          />
        </div>
        {uploaded === 1 ? (
          <button className="newUserButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newUserButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default NewUser