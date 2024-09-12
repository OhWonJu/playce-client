import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { _GET } from "./api/rootAPI";

const AlternativeRoute = () => {
  const { isLogin } = useAuthStore();

  if (typeof isLogin === "undefined") return null;

  return !isLogin ? <Outlet /> : <Navigate to="/home" />;
};

export default AlternativeRoute;
