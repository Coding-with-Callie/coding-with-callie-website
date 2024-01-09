import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import App from "./App";
import Apply from "./Pages/Apply";
import ContactCallie from "./Pages/ContactCallie";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import Resources from "./Pages/Resources";
import SignUp from "./Pages/SignUp";
import Submissions from "./Pages/Submissions";
import FullstackDeployment from "./Pages/FullstackDeployment";
import TodoList from "./Pages/TodoList";
import Workshops from "./Pages/Workshops";

export const showNotification = (
  message: string,
  type: "success" | "error"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

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
        path: "/workshops",
        element: <Workshops />,
      },
      {
        path: "/workshop-details",
        element: <TodoList />,
      },
      {
        path: "/workshops/todo-list",
        element: <TodoList />,
      },
      {
        path: "/workshops/fullstack-deployment",
        element: <FullstackDeployment />,
      },
      {
        path: "/apply",
        element: <Apply />,
        loader: () => {
          showNotification(
            "There are no workshops to apply to right now",
            "error"
          );
          return redirect("/");
        },
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
              showNotification(
                "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
                "error"
              );
              return redirect("/log-in");
            }
          } else {
            showNotification(
              "You must sign up to view Coding with Callie resources!",
              "error"
            );
            return redirect("/sign-up");
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
              showNotification(
                "It looks like your session has expired. Please log in again to view your account details!",
                "error"
              );
              return redirect("/log-in");
            }
          } else {
            showNotification(
              "You must have an account to view account details!",
              "error"
            );
            return redirect("/sign-up");
          }
        },
      },
      {
        path: "/profile/:token/:id",
        element: <Profile />,
        loader: async ({ params }) => {
          const token = params.token as string;
          const id = params.id;

          try {
            const response = await axios.get(
              `${
                process.env.REACT_APP_API || "http://localhost:3001/api"
              }/auth/profile/${token}/${id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            localStorage.setItem("token", response.data);

            showNotification("You can reset your password here!", "success");
            return redirect("/profile");
          } catch (error) {
            showNotification(
              "I'm sorry, this link is no longer active.",
              "error"
            );
            return redirect("/log-in");
          }
        },
      },
      {
        path: "/submissions/:id",
        element: <Submissions />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const id = params.id;

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/all-submissions/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              if (response.data.length > 0) {
                return response.data;
              } else {
                if (!id || parseInt(id) < 0 || parseInt(id) > 10) {
                  showNotification(`There are only 10 sessions`, "error");
                } else {
                  showNotification(
                    `There aren't any submissions for session ${id} yet!`,
                    "error"
                  );
                }

                return redirect("/");
              }
            } catch (error: any) {
              if (error.response.data.message === "Unauthorized") {
                showNotification(
                  "It looks like your session has expired. Please log in again to view Coding with Callie submissions!",
                  "error"
                );
                return redirect("/log-in");
              } else {
                showNotification("That page doesn't seem to exist!", "error");
                return redirect("/");
              }
            }
          } else {
            showNotification(
              "You must sign up to view Conding with Callie submissions!",
              "error"
            );
            return redirect("/sign-up");
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
    <ToastContainer
      limit={1}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      autoClose={2000}
    />
  </React.StrictMode>
);
