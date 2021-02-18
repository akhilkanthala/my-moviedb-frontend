import React from "react";
import { useAuth0 } from "../react-auth0-spa/react-auth0-spa";

const LandingPage = props => {
  const { isAuthenticated} = useAuth0();
  // const prop = [...props];
  return (
    <div>
      {!isAuthenticated && (
        <div>
          <h1>Landing Page</h1>
        </div>
      )}
      {isAuthenticated && props.history.push("/home")}
    </div>
  );
};

export default LandingPage;
