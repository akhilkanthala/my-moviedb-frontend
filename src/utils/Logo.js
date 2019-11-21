import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Logo from "../Assets/Images/icon.png";
// import "./Logo.css";
const useStyles = makeStyles(theme => ({
    Logo:{
        backgroundColor:'white',
        // padding:'8px',
        height:'40px',
        // width:'60px'
        // boxSizing: border-box,
        // borderRadius: 5
    }
    
}));
const logo = props => {
    const classes = useStyles();
   return (

  <div >
    <img className={classes.Logo} src={Logo} alt="my-moviedb" />
  </div>
);
}
export default logo;
