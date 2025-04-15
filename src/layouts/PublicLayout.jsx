import React from "react";
import Navbar from "../Components/Navbar/Navbar";

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default PublicLayout;
