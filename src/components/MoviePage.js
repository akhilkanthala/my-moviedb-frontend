import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
    // height:'400'
  },
  cardContainer: {
    height: 380
  },
  pad: {
    paddingTop: 50,
    paddingBottom: 10
  },
  media: {
    height: 150,
    width: 300,
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
    height: 180,
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
    // position: 'absolute',
    bottom: 10,
    left: 0
  },
  rightPanel: {
    position: "relative"
  },
  rating: {
    paddingLeft: 16
  },
  favorite: {
    color: "red"
  },
  notFavourite: {}
}));
const MoviePage = props => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [res, setRes] = useState(null);
  const [fav, setFav] = useState(-1);
  let id = localStorage.getItem("user");
  res !== null &&
    axios
      .get(`http://localhost:8080/users/${id}/favourite?mid=${res.res.data.id}`)
      .then(res => {
        res.data === true ? setFav(1) : setFav(-1);
      })
      .catch(err => console.log(err));
  function addFavourite() {
    res !== null && fav === -1
      ? axios
          .post(`http://localhost:8080/users/${id}/favourites`, {
            movieId: res.res.data.id,
            movieObject: res.res.data,
            user: { userName: user.name, email: user.email }
          })
          .then(res => {
            setFav(1);
            // console.log(res);
          })
          .catch(err => {
            // console.log(res.res.data,user.name)
            console.log(err);
          })
      : axios
          .delete(
            `http://localhost:8080/users/${id}/favourites/${res.res.data.id}`
          )
          .then(res => {
            setFav(-1);
            // console.log(fav);
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
  }
  useEffect(() => {
    props.location.state.type === "movie"
      ? axios
          .get(
            `https://api.themoviedb.org/3/movie/${props.location.state.id}?api_key=4494590a5fd91f4eae24ba93927418d8&language=en-US`
          )
          .then(res => {
            console.log(res);
            setRes({ res: res });
          })
          .catch(err => {
            console.log(err);
          })
      : axios
          .get(
            `https://api.themoviedb.org/3/tv/${props.location.state.id}?api_key=4494590a5fd91f4eae24ba93927418d8&language=en-US`
          )
          .then(res => {
            // console.log(res);
            setRes({ res: res });
          })
          .catch(err => {
            console.log(err);
          });
  }, [fav]);

  if (res == null) {
    return <div></div>;
  } else {
    return (
      <div>
        <Grid item xs={12} container justify={"center"} className={classes.pad}>
          {/* <Card res={res.res.data} type={"movie"}/> */}
          <Card className={classes.card}>
            <Grid container className={classes.cardContainer}>
              <Grid item xs={4} container justify="flex-end">
                <CardMedia
                  className={classes.media}
                  image={`https://image.tmdb.org/t/p/original${res.res.data.poster_path}`}
                  title={res.res.data.original_title}
                />
              </Grid>
              <Grid item xs={7} className={classes.rightPanel}>
                <CardHeader
                  title={
                    props.location.state.type === "movie"
                      ? `${res.res.data.original_title}`
                      : `${res.res.data.original_name}`
                  }
                  className={classes.title}
                />
                <Rating
                  value={res.res.data.vote_average / 2}
                  readOnly
                  className={classes.rating}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.typography}
                  >
                    {res.res.data.overview}
                  </Typography>
                </CardContent>
                <Grid
                  item
                  container
                  alignItems={"flex-end"}
                  className={classes.actions}
                >
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={addFavourite}
                      className={
                        fav === 1
                          ? `${classes.favorite}`
                          : `${classes.notFavourite}`
                      }
                    >
                      <FavoriteIcon
                      // className={`${fav===true && classes.favorite}`}
                      />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </div>
    );
  }
};

export default MoviePage;