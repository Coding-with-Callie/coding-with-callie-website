import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Apply from "./Pages/Apply";
import ContactCallie from "./Pages/ContactCallie";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import Resources from "./Pages/Resources";
import SignUp from "./Pages/SignUp";
import WorkshopDetails from "./Pages/WorkshopDetails";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/auth/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return response.data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/workshop-details",
        element: <WorkshopDetails />,
      },
      {
        path: "/apply",
        element: <Apply />,
      },
      {
        path: "/resources",
        element: <Resources />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/profile`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return response.data;
            } catch (error) {
              return redirect("/log-in");
            }
          } else {
            return {};
          }
        },
      },
      {
        path: "/contact-callie",
        element: <ContactCallie />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/profile`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return redirect("/");
            } catch (error) {
              return { token: true };
            }
          } else {
            return { token: false };
          }
        },
      },
      {
        path: "/log-in",
        element: <LogIn />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/profile`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return redirect("/");
            } catch (error) {
              return null;
            }
          } else {
            return {};
          }
        },
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/profile`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return response.data;
            } catch (error) {
              return redirect("/log-in");
            }
          } else {
            return {};
          }
        },
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
