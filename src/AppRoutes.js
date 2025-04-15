// File: src/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminLayout from "./layouts/AdminLayout";

function AppRoutes() {
  const renderWithLayout = (layout, element) => {
    switch (layout) {
      case "public":
        return <PublicLayout>{element}</PublicLayout>;
      case "protected":
        return <ProtectedLayout>{element}</ProtectedLayout>;
      case "admin":
        return <AdminLayout>{element}</AdminLayout>;
      default:
        return element; // raw, no layout
    }
  };

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, layout }, index) => (
          <Route
            key={index}
            path={path}
            element={renderWithLayout(layout, element)}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
