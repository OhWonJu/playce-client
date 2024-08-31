import { Routes, Route, Navigate } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./routes";

import JoinPage from "./pages/(auth)/(routes)/join/Page";
import LoginPage from "./pages/(auth)/(routes)/login/Page";

function App() {
  const currentUser = null;

  return (
    <Routes>
      {privateRoutes.map(route => (
        //@ts-ignore
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {publicRoutes.map(route => (
        //@ts-ignore
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route
        path="/join"
        element={currentUser ? <Navigate to="/" /> : <JoinPage />}
      />

      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
