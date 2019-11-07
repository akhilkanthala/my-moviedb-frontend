import React from "react";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../Logo";

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
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Discover
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect({})}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
