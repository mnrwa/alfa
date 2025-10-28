import "./App";

import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "./routes";

import { ViewProducts } from "./products/viewProducts/viewProducts";
import { ProductById } from "./products/[id]/productById";

function App() {
  return (
    <div style={{ margin: "20px" }}>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.PRODUCTS} replace />}
        />
        <Route path={ROUTES.PRODUCTS} element={<ViewProducts />} />
        <Route path={ROUTES.PRODUCT_BY_ID(":id")} element={<ProductById />} />
      </Routes>
    </div>
  );
}

export default App;
