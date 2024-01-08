import { UseAuthContext } from "./auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = UseAuthContext();

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
