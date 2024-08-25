import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import IPod from "./IPod";
import Login from "./Login";
import Redirect from "./Redirect";
import Artists from "./Artists";
import Artist from "./Artist";
import ArtistList from "./ArtistList";
import AlbumList from "./AlbumList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IPod />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/artists" />,
      },
      {
        path: "artists",
        element: <Artists />,
        children: [
          {
            index: true,
            element: <ArtistList />,
          },
          {
            path: ":artistName",
            element: <Artist />,
            children: [
              {
                index: true,
                element: <AlbumList />,
              },
            ],
          },
        ],
      },
    ],
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
