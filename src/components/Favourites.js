import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import { Grid } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  card: {
    width: "80%"
  },
  cardContainer: {
    height: 280
  },
  pad: {
    paddingTop: 10,
    paddingBottom: 10
  },
  media: {
    height: 169,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120
  },
  typography: {
    maxHeight: 80,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  title: {
    maxHeight: 80,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  actions: {
    height: 60,
    position: "absolute",
    bottom: 10,
    left: 0
  },
  rightPanel: {
    position: "relative"
  },
  rating: {
    paddingLeft: 16
  }
}));

const Favourite = () => {
  const classes = useStyles();
  let id = localStorage.getItem("user");
  const [res, setRes] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}/favourites`)
      .then(res => {
        setRes(res);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (res == null) {
    return <div></div>;
  } else {
    console.log(res.data);
    return (
      <div>
        <Grid container justify={"center"}>
          <h1 style={{ color: "black" }}>Favourites</h1>
        </Grid>
        <Grid container className={classes.pad}>
          {res.data.map((res, index) => (
            <Grid
              key={index}
              item
              xs={6}
              container
              justify={"center"}
              className={classes.pad}
            >
              <Card
                res={res.movieObject}
                type={res.movieObject.original_name === null ? "movie" : "tv"}
              />
            </Grid>
          ))}
          <Grid container justify={"center"} className={classes.pad}></Grid>
        </Grid>
      </div>
    );
  }
};

export default Favourite;
