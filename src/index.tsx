import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/index";

ReactDOM.createRoot(document.querySelector(".main") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
