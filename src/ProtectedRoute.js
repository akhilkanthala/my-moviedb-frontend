import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa/react-auth0-spa";

export const ProtectedRoute = ({component:Component, ...rest}) => {
  const { isAuthenticated} = useAuth0();
   return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
