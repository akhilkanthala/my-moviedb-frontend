import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";
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

const Home = props => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [state, setState] = useState({
    res: null,
    value: "movie",
    sort: "popularity.desc",
    page: 1
  });
  useEffect(() => {
    axios
      .post(`http://localhost:8080/users`, {
        userName: user.name,
        email: user.email
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/users/${user.email}`)
      .then(res => {
        // console.log(res.data);
        localStorage.setItem("user", res.data.id);
        console.log(localStorage.getItem("user"));
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=4494590a5fd91f4eae24ba93927418d8`
      )
      .then(res => {
        console.log(res);
        setState({ ...state, res: res });
      })
      .catch(err => {
        console.log(err);
      });
    
  }, []);
  

  if (state.res == null) {
    return <div></div>;
  } else {
    console.log(state.res);
    return (
      <div>
        <Grid container justify={"center"}>
          <h1 style={{ color: "black" }}>Trending</h1>
        </Grid>
        <Grid container className={classes.pad}>
          {state.res.data.results.map((res, index) => (
            <Grid
              key={index}
              item
              xs={6}
              container
              justify={"center"}
              className={classes.pad}
            >
              <Card res={res} type={res.media_type} />
            </Grid>
          ))}
          <Grid container justify={"center"} className={classes.pad}></Grid>
        </Grid>
      </div>
    );
  }
};

export default Home;
