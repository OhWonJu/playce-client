import { Routes, Route, Navigate } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";

import JoinPage from "./pages/(auth)/(routes)/join/Page";
import RootPage from "./pages/(root)/Page";
import { _GET } from "./api/rootAPI";
import { useAuthStore } from "./stores/useAuthStore";
import { Suspense } from "react";

function App() {
  const { isLogin } = useAuthStore();

  return (
    <Suspense>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(route => (
            //@ts-ignore
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route
          path="/join"
          element={isLogin ? <Navigate to="/home" /> : <JoinPage />}
        />

        <Route
          path="/"
          element={isLogin ? <Navigate to="/home" /> : <RootPage />}
        />

        {publicRoutes.map(route => (
          //@ts-ignore
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
