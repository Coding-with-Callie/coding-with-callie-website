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
import Home from "./Pages/Home";
import Workshops from "./Pages/Workshops";
import ContactCallie from "./Pages/ContactCallie";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import Submissions from "./Pages/Submissions";
import Reviews from "./Pages/Reviews";
import CallieSubmission from "./Pages/CallieSubmission";
import UserDetails from "./Pages/UserDetails";
import GuestSpeakers from "./Pages/GuestSpeakers";
import Return from "./Pages/Return";
import WorkshopDetails from "./Pages/WorkshopDetails";
import WorkshopResources from "./Pages/WorkshopResources";
import MyWorkshops from "./Pages/MyWorkshops";
import Paragraph from "./Components/Paragraph";
import Alumni from "./Pages/Alumni";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
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
          console.log("ERROR", error);
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
        path: "/return",
        element: <Return />,
      },
      {
        path: "/*",
        element: <Paragraph>Not Found</Paragraph>,
      },
      {
        path: "/workshops",
        element: <Workshops />,
        loader: async () => {
          const response = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/workshops`
          );
          return response.data;
        },
      },
      {
        path: "/workshops/:id",
        element: <WorkshopDetails />,
        loader: async ({ params }) => {
          const id = params.id;
          const response = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/workshop/${id}`
          );
          return response.data;
        },
      },
      {
        path: "/reviews",
        element: <Reviews />,
        loader: async () => {
          const response = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/reviews`
          );
          return response.data;
        },
      },
      {
        path: "/my-workshops",
        element: <MyWorkshops />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/my-workshops`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return response.data;
            } catch (error: any) {
              if (error.response.data.message === "Unauthorized") {
                showNotification(
                  "It looks like your session has expired. Please log in again to view this workshop's resources!",
                  "error"
                );
                return redirect("/log-in");
              }

              if (error.response.data.message === "no workshops found") {
                showNotification(
                  "You do not have access to any Coding with Callie workshops!",
                  "error"
                );
                return redirect("/workshops");
              }
            }
          } else {
            showNotification(
              "You must sign up to view workshop resources!",
              "error"
            );
            return redirect("/sign-up");
          }
        },
      },
      {
        path: "/resources/:id",
        element: <WorkshopResources />,
        loader: async ({ params }) => {
          const { id } = params;
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/resources/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return response.data;
            } catch (error: any) {
              if (error.response.data.message === "Unauthorized") {
                showNotification(
                  "It looks like your session has expired. Please log in again to view this workshop's resources!",
                  "error"
                );
                return redirect("/log-in");
              }

              if (error.response.data.message === "workshop not found") {
                showNotification(
                  "We couldn't find the workshop you're looking for. Please try again.",
                  "error"
                );
                return redirect("/workshops");
              }
            }
          } else {
            showNotification(
              "You must sign up to view workshop resources!",
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
        path: "/guest-speakers",
        element: <GuestSpeakers />,
        loader: async () => {
          const response = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/auth/speakers`
          );
          return response.data;
        },
      },
      {
        path: "/alumni",
        element: <Alumni />,
        loader: async () => {
          const response = await axios.get(
            `${process.env.REACT_APP_API || "http://localhost:3001/api"}/alumni`
          );
          return response.data;
        },
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
        path: "/user-details/:id",
        element: <UserDetails />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const id = params.id;

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/user-details/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return response.data;
            } catch (error: any) {
              if (error?.response.data.message === "Role") {
                showNotification(
                  "You are not authorized to view that page!",
                  "error"
                );
                return redirect("/");
              } else {
                showNotification(
                  "It looks like your session has expired. Please log in again to view your account details!",
                  "error"
                );
                return redirect("/log-in");
              }
            }
          } else {
            showNotification("You do not have access to that page!", "error");
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
        path: "/submissions/callie/:workshopId/:id",
        element: <CallieSubmission />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const id = params.id;
          const workshopId = params.workshopId;

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/solution-videos/${workshopId}/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              return response.data;
            } catch (error) {
              showNotification(
                "It looks like your session has expired. Please log in again to view Callie's submissions!",
                "error"
              );
              return redirect("/log-in");
            }
          } else {
            showNotification(
              "You must sign up to view Callie's submissions!",
              "error"
            );
            return redirect("/sign-up");
          }
        },
      },
      {
        path: "/submissions/:workshopId/:id",
        element: <Submissions />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const workshopId = params.workshopId;
          const id = params.id;

          if (token) {
            try {
              const response = await axios.get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/all-submissions/${workshopId}/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              const submissions = response.data.submissions;

              return submissions;
            } catch (error: any) {
              if (error.response.data.message === "Unauthorized") {
                showNotification(
                  "It looks like your session has expired. Please log in again to view Coding with Callie submissions!",
                  "error"
                );
                return redirect("/log-in");
              } else if (
                error.response.data.message ===
                "You have not submitted the deliverable for this session yet!"
              ) {
                showNotification(`${error.response.data.message}`, "error");
                return redirect(`/resources/${workshopId}`);
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
  <>
    <RouterProvider router={router} />
    <ToastContainer
      limit={1}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      autoClose={2000}
    />
  </>
);
