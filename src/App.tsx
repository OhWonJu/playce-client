import { Routes, Route, Navigate } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./routes";

import SignUpPage from "./pages/(auth)/(routes)/signUp/Page";
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
        path="/signin"
        element={currentUser ? <Navigate to="/" /> : <SignUpPage />}
      />

      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
