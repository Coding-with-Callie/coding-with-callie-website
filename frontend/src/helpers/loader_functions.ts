import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { showNotification } from "..";
import { axiosPrivate, axiosPublic } from "./axios_instances";

const privateEndpoints = ["profile", "user-details", "project"];

export const Load = async (endpoint: string) => {
  // Check if the endpoint requires authentication
  // Disregard the query parameters
  const useAxiosPrivate = privateEndpoints.includes(endpoint.split("/")[0]);

  // Use private axios instance if endpoint requires authentication
  try {
    const response = await (useAxiosPrivate ? axiosPrivate : axiosPublic).get(
      `/${endpoint}`
    );

    return response.data;
  } catch (error: any) {
    showNotification(
      error.message || `An error occurred loading ${endpoint}.`,
      "error"
    );
    return redirect(error.path);
  }
};

export const RedirectLoggedInUser = async () => {
  // Check if the user is already logged in
  // If they are, redirect them to the home page
  try {
    await axiosPrivate.get("/profile");
    console.log("User is already logged in.");
    return redirect("/");
  } catch (error) {
    return {};
  }
};

// TODO: Change when we refactor authentication
export const ProfileResetLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = params.token as string;
  const id = params.id;

  try {
    const response = await axiosPublic.get(`/profile/${token}/${id}`);
    localStorage.setItem("token", response.data);

    showNotification("You can reset your password here!", "success");
    return redirect("/profile");
  } catch (error) {
    showNotification("I'm sorry, this link is no longer active.", "error");
    return redirect("/log-in");
  }
};
