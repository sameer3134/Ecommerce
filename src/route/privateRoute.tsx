import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const token = sessionStorage.getItem("adminAuth");
  return token === process.env.REACT_APP_LOGIN ? <Outlet /> : <Navigate to="/auth" replace={true} />;
}
export default PrivateRoute;
