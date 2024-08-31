import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
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
    </Routes>
  );
}

export default App;
