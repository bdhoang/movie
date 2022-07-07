import React from 'react'
import "./newuser.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import AdNav from '../../../components/admincpn/adnav/AdNav';
import SideBar from '../../../components/admincpn/sidebar/SideBar';


interface Props {
  inputs: any,
  title: string
}
const NewUser: React.FC <Props>= ({inputs,title}) => {
  const [file, setFile] = useState<any>("");
  console.log(file)
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <AdNav />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e:any) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input: any) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser