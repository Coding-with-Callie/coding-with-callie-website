import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import App from "./App";
import Home from "./Pages/Home";
import Workshops from "./Pages/Workshops";
import ContactCallie from "./Pages/ContactCallie";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import Reviews from "./Pages/Reviews";
import GuestSpeakers from "./Pages/GuestSpeakers";
import Paragraph from "./Components/Paragraph";
import Projects from "./Pages/Projects";
import Jobs from "./Pages/Jobs";
import {
  Load,
  ProfileResetLoader,
  RedirectLoggedInUser,
} from "./helpers/loader_functions";
import EditPassword from "./Components/Profile/EditPassword";
import Feature from "./Pages/Feature";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => Load("user-details"),
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => Load("resources"),
      },
      {
        path: "/*",
        element: <Paragraph>Not Found</Paragraph>,
      },
      {
        path: "/workshops",
        element: <Workshops />,
        loader: () => Load("workshops"),
      },
      {
        path: "/reviews",
        element: <Reviews />,
        loader: () => Load("reviews"),
      },
      {
        path: "/contact",
        element: <ContactCallie />,
      },
      {
        path: "/guest-speakers",
        element: <GuestSpeakers />,
        loader: () => Load("speakers"),
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: RedirectLoggedInUser,
      },
      {
        path: "/log-in",
        element: <LogIn />,
        loader: RedirectLoggedInUser,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: () => Load("profile"),
      },
      {
        path: "/change-password",
        element: <EditPassword />,
        loader: () => Load("profile"),
      },
      {
        path: "/profile/:token/:id",
        element: <Profile />,
        loader: ProfileResetLoader,
      },
      {
        path: "/projects",
        element: <Projects />,
        loader: () => Load("project"),
      },
      {
        path: "project/:projectId/feature/:featureId",
        element: <Feature />,
        loader: ({ params }) =>
          Load(`project/${params.projectId}/feature/${params.featureId}`),
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
