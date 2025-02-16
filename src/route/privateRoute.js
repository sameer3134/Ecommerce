import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace={true} />;
}
export default PrivateRoute;
