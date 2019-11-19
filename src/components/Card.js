import React, { useState } from "react";
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
import history from "../history";

const useStyles = makeStyles(theme => ({
  card: {
    width: "80%"
    // height: "100%"
  },
  cardContainer: {
    // height: "100%",
  },
  pad: {
    paddingTop: 10,
    paddingBottom: 10
  },
  media: {
    height: "100%",
    width: "100%",
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
    maxHeight: 100,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  title: {
    maxHeight: 80,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  actions: {
    // height: "10%",
    // position: 'absolute',
    bottom: 10,
    left: 0
  },
  rightPanel: {
    position: "relative"
  },
  rating: {
    paddingLeft: 16
    // height:"30%"
  },
  favorite: {
    color: "red"
  },
  notFavourite: {}
}));
const Cards = props => {
  const classes = useStyles();
  const [fav, setFav] = useState(-1);
  const { user } = useAuth0();
  let id = localStorage.getItem("user");
  props.res !== null &&
    axios
      .get(`http://localhost:8080/users/${id}/favourite?mid=${props.res.id}`)
      .then(res => {
        res.data === true ? setFav(1) : setFav(-1);
      })
      .catch(err => console.log(err));
  function addFavourite(e) {
    e.stopPropagation();
    props.res !== null && fav === -1
      ? axios
          .post(`http://localhost:8080/users/${id}/favourites`, {
            movieId: props.res.id,
            movieObject: props.res,
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
            `http://localhost:8080/users/${id}/favourites/${props.res.id}`
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
  return (
    <Grid
      // item
      // xs={6}
      container
      justify={"center"}
      className={classes.pad}
    >
      <Card
        className={classes.card}
        onClick={() =>
          history.push(
            `/${
              props.type === "movie"
                ? `movie/${props.res.original_title}`
                : `tv/${props.res.original_name}`
            }`,
            { id: props.res.id, type: props.type }
          )
        }
      >
        <Grid container className={classes.cardContainer}>
          <Grid item xs={5} container justify="flex-end">
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/original${props.res.poster_path}`}
              title={props.res.original_title}
              data-testid="poster"
            />
          </Grid>
          <Grid item xs={7} className={classes.rightPanel}>
            <CardHeader
              title={
                props.type === "movie"
                  ? `${props.res.original_title}`
                  : `${props.res.original_name}`
              }
              className={classes.title}
              data-testid="title"
            />
            <Rating
              value={props.res.vote_average / 2}
              readOnly
              className={classes.rating}
              data-testid="rating"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.typography}
                data-testid="overview"
              >
                {props.res.overview}
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
                  <FavoriteIcon />
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
  );
};

export default Cards;
