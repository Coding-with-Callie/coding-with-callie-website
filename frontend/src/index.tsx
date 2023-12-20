import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Apply from "./pages/Apply";
import ContactCallie from "./pages/ContactCallie";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import WorkshopDetails from "./pages/WorkshopDetails";

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
