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
import Project from "./Pages/Project";
import Jobs from "./Pages/Jobs";
import GuestSpeakerDetails from "./Pages/GuestSpeakerProfile";
import {
  BasicLoader,
  AppLoader,
  SignUpLoader,
  LoginLoader,
  ProfileLoader,
  ProfileResetLoader,
  UserProjectsLoader,
  ProjectLoader,
  CombinedLoader,
  ProfileLoaderNoToast,
} from "./helpers/loader_functions";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

export const host =
  process.env.REACT_APP_ENV === "production"
    ? `https://${window.location.host}`
    : `http://localhost:3001`;

const router = createBrowserRouter([
  {
    element: <App />,
    loader: AppLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => BasicLoader("resources"),
      },
      {
        path: "/*",
        element: <Paragraph>Not Found</Paragraph>,
      },
      {
        path: "/workshops",
        element: <Workshops />,
        loader: () => BasicLoader("workshops"),
      },
      {
        path: "/reviews",
        element: <Reviews />,
        loader: () => BasicLoader("reviews"),
      },
      {
        path: "/contact-callie",
        element: <ContactCallie />,
      },
      {
        path: "/guest-speakers",
        element: <GuestSpeakers />,
        loader: () => BasicLoader("auth/speakers"),
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: SignUpLoader,
      },
      {
        path: "/log-in",
        element: <LogIn />,
        loader: LoginLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: ProfileLoader,
      },
      {
        path: "/profile/:token/:id",
        element: <Profile />,
        loader: ProfileResetLoader,
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: ProjectLoader,
      },
      {
        path: "/projects",
        element: <Projects />,
        loader: UserProjectsLoader,
      },
      {
        path: "/guest-speaker/:id",
        element: <GuestSpeakerDetails />,
        loader: () => CombinedLoader("auth/speakers", ProfileLoaderNoToast),
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
