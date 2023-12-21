import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Apply from "./Pages/Apply";
import ContactCallie from "./Pages/ContactCallie";
import Home from "./Pages/Home";
import Resources from "./Pages/Resources";
import WorkshopDetails from "./Pages/WorkshopDetails";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/workshop-details",
        index: true,
        element: <WorkshopDetails />,
      },
      {
        path: "/apply",
        index: true,
        element: <Apply />,
      },
      {
        path: "/resources",
        index: true,
        element: <Resources />,
      },
      {
        path: "/contact-callie",
        index: true,
        element: <ContactCallie />,
      },
    ],
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
