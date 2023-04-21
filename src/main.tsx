import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
