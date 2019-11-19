import React from "react";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../Logo";
import history from "../history";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "blue"
  },
  menuButton: {
    marginRight: theme.spacing(2)
    // height:'20px'
  },
  title: {
    flexGrow: 1,
    cursor:'pointer'
  },

}));

const ButtonAppBar = props => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={1} container alignItems={"center"}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => history.push("/home")}
              >
                <Logo />
              </IconButton>
            </Grid>
            <Grid item xs={2} container justify={"flex-end"} alignItems={"center"}>
              {isAuthenticated && (
                <Typography
                  variant="h6"
                  onClick={() => history.push("/discover")}
                  className={classes.title}
                >
                  Discover
                </Typography>
              )}
            </Grid>
            <Grid item xs={2} container justify={"flex-start"} alignItems={"center"}>
              {isAuthenticated && (
                <Typography
                  variant="h6"
                  onClick={() => history.push("/favourite")}
                  className={classes.title}
                >
                  Favourites
                </Typography>
              )}
            </Grid>
            <Grid item xs={7} container justify={"flex-end"}>
              {isAuthenticated ? (
                <Button color="inherit" onClick={() => logout()}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={() => loginWithRedirect({})}>
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default ButtonAppBar;
