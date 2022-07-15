import * as React from 'react';
import "./dialog.scss"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { MovieContext } from '../../context/admin/movieContext/MovieContext';
import { getMovies } from '../../context/admin/movieContext/apiCall';

import { FacebookIcon, FacebookShareButton } from "react-share";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Card } from '@mui/material';
import firebase from 'firebase';
import { UserContext } from '../../context/admin/userContext/UserContext';
import { getUsers } from '../../context/admin/userContext/apiCall';
import { database } from '../../firebase';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
interface Props{
    id: any
}
const CustomizedDialogs:React.FC<Props> = ({id}) => {
  const [cmt,setCmt] = useState<any>("")
  const [cmts,setCmts] = useState<any>("")
    const {state,dispatch} = useContext(MovieContext)
  const [open, setOpen] = useState(false);
    const[movie,setMovie] = useState<any>   ()
  useEffect(() => {
    getMovies(dispatch)
  }, [dispatch])
  const value:any = localStorage.getItem("user")
    
  const handleClickOpen = () => {
    setOpen(true);
    setMovie(state.movies.find((item: any) => item._id === id))
  };
  const handleClose = () => {
    setOpen(false);
  };
  const writeUserData = (movieId:any) =>{
    firebase.database().ref(`/movie/${movieId}/${JSON.parse(value)._id}`).set({
      user: JSON.parse(value).username,
      img: JSON.parse(value).profilePic,
      comment:cmt
    });
    setCmt("")
  }
console.log(value);

  useEffect(() => {
   const db = database.ref(`/movie/${id}`)
   db.on('value', (snapshot) => {
    setCmts([])
    const data = snapshot.val()
    if(data !== null) {
      Object.values(data).map((cmt) =>{
        setCmts((oldArray:any) => [...oldArray,cmt])
      })
    }
   })
  }, [])

  console.log(cmts);
  
  return (
    <div  >
      <KeyboardArrowDown onClick={handleClickOpen} className='icon' />
      <BootstrapDialog   fullWidth maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div style={{backgroundColor:"#181818",color:'white'}}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
          {movie?.title}
        </BootstrapDialogTitle>
        <video src={movie?.trailer} style={{width:"100%"}} autoPlay={true} loop />
        <div className="itemInfo">
          <div className="itemInfoTop">
            <span>Duration: 2 hours</span>
            <span className='limit'>{"Limit: " + movie?.limit}</span>
            <span>{"Year: " + movie?.year}</span>
            <FacebookShareButton children={<FacebookIcon style={{marginLeft:"10px"}} size={32} round/>} url={movie?.trailer}  />
          </div>
          <div className="desc">
            {"Desc: " + movie?.desc}
          </div>
          <div className="genre">{"Genre: " +movie?.genre}</div>
        </div>
        <div className="body">
        <Card className='comment' >
        <div className="cmtHeader">
        <TextareaAutosize
         aria-label="empty textarea"
        placeholder="Type your reply..."
        style={{ width: 500 ,height:50,marginRight:10}}
        value={cmt}
        onChange={(e:any)=> setCmt(e.target.value)}
        />
        <Button variant="contained" onClick={() => writeUserData(id)}>Post</Button>
        </div>
            <div className="cmtInfo">
              {
            
                 cmts && cmts.map((item:any)=>(
                    <div className='cmtCard'>
                    <img src={item.img}/>
                    <div className="cmtContent">
                      <div className="cmtName">{item.user}</div>
                      <div className="cmt">{item.comment}</div>
                    </div>
                    </div>
                  ))
                
              }
            </div>
        </Card>
        </div>
        </div>
      </BootstrapDialog>
    </div>
  );
}

export default CustomizedDialogs