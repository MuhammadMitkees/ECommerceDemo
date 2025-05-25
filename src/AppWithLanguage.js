// AppWithLanguage.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";

function AppWithLanguage() {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    document.body.setAttribute("dir", lang === "AR" ? "rtl" : "ltr");
  }, [lang]);

  return <AppRoutes />;
}

export default AppWithLanguage;
