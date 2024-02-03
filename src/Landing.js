import React from "react";
import { AuthContext } from "./App.js";
export const Landing = () => {
  const token = React.useContext(AuthContext);
  return (
    <>
      <h2>Landing (Public Access)</h2>
      <div> Authenticated as {token}</div>
    </>
  );
};