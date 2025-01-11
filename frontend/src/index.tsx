import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import App from "./App";
import { Load } from "./helpers/loader_functions";
import { axiosPublic } from "./helpers/axios_instances";
import Page, { PageType } from "./Pages/Page";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast[type](message, { toastId: `${type}-${message}` });
};

const getRoutes = async () => {
  const pages = (await axiosPublic.get("pages")).data as PageType[];

  pages.push({
    path: "/log-in",
    page: "Log In",
    sections: [{ id: 0, type: "log-in form", data: { heading: "Log in" } }],
  });

  const children = pages.map((page: any) => {
    return {
      path: page.path,
      element: <Page data={page} />,
    };
  });

  children.push({
    path: "/*",
    element: <div>Page not found!</div>,
  });

  return [
    {
      element: <App pages={pages} />,
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
