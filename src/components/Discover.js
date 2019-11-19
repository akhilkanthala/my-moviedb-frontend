// export default Discover;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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

export default function Dicover() {
  const classes = useStyles();
  //   const [page, setPage] = useState(1);
  const [state, setState] = useState({
    res: null,
    value: "movie",
    sort: "popularity.desc",
    page: 1
  });
  const handleChange = (event, newValue) => {
    setState({ ...state, value: newValue, sort: "popularity.desc", page: 1 });
  };
  const handleSort = (event, newValue) => {
    //   console.log(newValue.props.value)
    setState({ ...state, sort: newValue.props.value, page: 1 });
  };
  //   useEffect(() => {

  //   }, [value]);
  //   console.log(page)
 
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/${state.value}?api_key=4494590a5fd91f4eae24ba93927418d8&language=en-US&sort_by=${state.sort}&include_adult=false&include_video=false&page=${state.page}`
      )
      .then(res => {
        console.log(res);
        setState({ ...state, res: res });
      })
      .catch(err => {

        console.log(err);
      });
  }, [state.value, state.sort, state.page]);

  if (state.res == null) {
    return <div></div>;
  } else {
    console.log(state.res);
    return (
      <div>
        <Grid container>
          <Grid item xs={5} container justify={"flex-end"}>
            <h1>Discover New Movies & TV Shows</h1>
          </Grid>
          <Grid item xs={4} container alignContent={"center"}>
            {/* <Paper className={classes.root}> */}
            <Tabs
              value={state.value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab value="movie" label="Movies" />
              <Tab value="tv" label="TV" />
            </Tabs>
            {/* </Paper> */}
          </Grid>
          <Grid item xs={2} container alignContent={"center"}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Sort by
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={`${state.sort}`}
                onChange={handleSort}
              >
                <MenuItem value={"popularity.desc"}>popularity.desc</MenuItem>
                <MenuItem value={"popularity.asc"}>popularity.asc</MenuItem>
                {state.value === "movie" && (
                  <MenuItem value={"revenue.desc"}>revenue.desc</MenuItem>
                )}
                {state.value === "movie" && (
                  <MenuItem value={"revenue.asc"}>revenue.asc</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
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
            <Card res={res} type={state.value} />
             </Grid> 
          
          ))}
          <Grid container justify={"center"} className={classes.pad}>
            {/* <Paper alignContent={"center"}>  */}
            <Grid item xs={5} container justify={"flex-end"}>
              <ArrowBackIosIcon
                color={"primary"}
                fontSize={"large"}
                onClick={() =>
                  state.page !== 1
                    ? setState({ ...state, page: state.page - 1 })
                    : ""
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              container
              justify={"center"}
              alignItems={"center"}
            >
              PAGE {state.page}
            </Grid>

            <Grid item xs={5} container justify={"flex-start"}>
              <ArrowForwardIosSharpIcon
                color={"primary"}
                fontSize={"large"}
                onClick={() => setState({ ...state, page: state.page + 1 })}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
