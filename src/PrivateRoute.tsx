import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { _GET } from "./api/rootAPI";

const PrivateRoute = () => {
  const { isLogin } = useAuthStore();

  // TODO: LOADING NEEDED
  if (typeof isLogin === "undefined") return null;

  return isLogin ? <Outlet /> : <Navigate to="/access-denied" />;
};

export default PrivateRoute;
