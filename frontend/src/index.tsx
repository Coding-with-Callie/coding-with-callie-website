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
import Jobs from "./Pages/Jobs";
import {
  Load,
  ProfileResetLoader,
  RedirectLoggedInUser,
} from "./helpers/loader_functions";
import EditPassword from "./Components/Profile/EditPassword";
import Checklists from "./Pages/Checklists";
import Checklist from "./Pages/Checklist";
import { axiosPublic } from "./helpers/axios_instances";
import path from "path";
import Page from "./Pages/Page";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

const getRoutes = async () => {
  const routes = await axiosPublic.get("routes");

  const children = routes.data.map((route: any) => {
    return {
      path: route.path,
      element: <Page />,
      loader: () => Load(route.loader),
    };
  });

  return [
    {
      element: <App />,
      loader: () => Load("user-details"),
      children,
    },
  ];
};

const router = createBrowserRouter(await getRoutes());

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
