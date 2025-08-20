// AppWithLanguage.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";

function AppWithLanguage() {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    // Store language in a data attribute for specific components to use
    document.body.setAttribute("data-lang", lang);
    // Remove global direction, keep body as LTR
    document.body.setAttribute("dir", "ltr");
  }, [lang]);

  return <AppRoutes />;
}

export default AppWithLanguage;
