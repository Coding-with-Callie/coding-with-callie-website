import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import App from "./App";
import { Load } from "./helpers/loader_functions";
import { axiosPublic } from "./helpers/axios_instances";
import Page from "./Pages/Page";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

const getRoutes = async () => {
  const routes = await axiosPublic.get("routes");

  console.log("routes:", routes);

  const children = routes.data.map((route: any) => {
    return {
      path: route.path,
      element: <Page resources={route.resources} />,
    };
  });

  children.push({
    path: "/*",
    element: <div>Page not found!</div>,
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
