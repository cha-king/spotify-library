import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import IPod from "./IPod";
import Login from "./Login";
import Redirect from "./Redirect";
import Artists from "./Artists";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IPod />,
    children: [
      {
        path: "artists",
        element: <Artists />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/redirect",
    element: <Redirect />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
