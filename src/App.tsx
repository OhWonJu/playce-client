import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import { alternativeRoutes, privateRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import AlternativeRoute from "./AlternativeRoute";

function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(route => (
            //@ts-ignore
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<AlternativeRoute />}>
          {alternativeRoutes.map(route => (
            //@ts-ignore
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {publicRoutes.map(route => (
          //@ts-ignore
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
