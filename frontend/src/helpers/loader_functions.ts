import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { showNotification } from "..";
import { axiosPrivate, axiosPublic } from "./axios_instances";

const privateEndpoints = ["profile", "user-details", "user-projects"];

export const Load = async (endpoint: string) => {
  // User private axios instance if endpoint
  // requires authentication
  try {
    const response = await (privateEndpoints.includes(endpoint)
      ? axiosPrivate
      : axiosPublic
    ).get(`/${endpoint}`);
    return response.data;
  } catch (error: any) {
    // User is not logged in and trying to access public endpoint
    // We were just trying to access the profile endpoint to update
    // the user's information
    if (endpoint === "user-details") {
      return {};
    }

    // There is no token in local storage. User likely does not have an account.
    if (error.code === "ERR_CANCELED") {
      showNotification(
        "You must have an account to view account details!",
        "error"
      );
      return redirect("/sign-up");
    }

    // User has a token, but it is invalid. User's session has expired.
    if (error.response.status === 401) {
      showNotification(
        "It looks like your session has expired. Please log in again to view your account details!",
        "error"
      );
      return redirect("/log-in");
    }

    // Some other error occurred
    showNotification(`An error occurred loading ${endpoint}.`, "error");
    return {};
  }
};

export const RedirectLoggedInUser = async () => {
  // Check if the user is already logged in
  // If they are, redirect them to the home page
  try {
    await axiosPrivate.get("/user-details");
    return redirect("/");
  } catch (error) {
    return {};
  }
};

// TODO: Simplify this function
export const ProfileResetLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = params.token as string;
  const id = params.id;

  try {
    const response = await axiosPrivate.get(`/profile/${token}/${id}`);
    localStorage.setItem("token", response.data);

    showNotification("You can reset your password here!", "success");
    return redirect("/profile");
  } catch (error) {
    showNotification("I'm sorry, this link is no longer active.", "error");
    return redirect("/log-in");
  }
};

// TODO: Simplify this function
export const ProjectLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axiosPrivate.get(`/project/${params.id}`);

      if (response.data.length === 0) {
        showNotification("You do not have access to that project!", "error");
        return redirect("/projects");
      }

      return response.data;
    } catch (error) {
      showNotification("You must be signed in to view this page!", "error");
      return redirect("/log-in");
    }
  } else {
    showNotification("You must have an account to view this page!", "error");
    return redirect("/sign-up");
  }
};
