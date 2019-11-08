import React from "react";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";
import AppBar from "./AppBar";

const LandingPage = props => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      {/* {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )} */}
      {!isAuthenticated && 
      <div>
        <AppBar/>
        <h1>Landing Page</h1>
        </div>
    }
    {isAuthenticated && props.history.push("/home")}
      {/* {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}

      {/* NEW - add a link to the home and profile pages */}
      {/* {isAuthenticated && props.history.push("/profile")} */}
    </div>
  );
};

export default LandingPage;
