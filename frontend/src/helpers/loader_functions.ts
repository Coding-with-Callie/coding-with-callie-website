import axios from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { host, showNotification } from "..";

export const BasicLoader = async (endpoint: string) => {
  const response = await axios.get(`${host}/api/${endpoint}`);
  return response.data;
};

export const AppLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(`${host}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {};
    }
  } else {
    return {};
  }
};

export const SignUpLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await axios.get(`${host}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return redirect("/");
    } catch (error) {
      return { token: true };
    }
  } else {
    return { token: false };
  }
};

export const LoginLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await axios.get(`${host}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return redirect("/");
    } catch (error) {
      return null;
    }
  } else {
    return {};
  }
};

export const ProfileLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(`${host}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
};

export const ProfileLoaderNoToast = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await axios.get(`${host}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } else {
    return {};
  }
};

export const ProfileResetLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = params.token as string;
  const id = params.id;

  try {
    const response = await axios.get(
      `${host}/api/auth/profile/${token}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.setItem("token", response.data);

    showNotification("You can reset your password here!", "success");
    return redirect("/profile");
  } catch (error) {
    showNotification("I'm sorry, this link is no longer active.", "error");
    return redirect("/log-in");
  }
};

export const ProjectLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(
        `${host}/api/auth/project/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

export const UserProjectsLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(`${host}/api/auth/user-projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

export async function CombinedLoader(endpoint: string, loader: () => any) {
  const basicData = await BasicLoader(endpoint);
  const loaderData = await loader();
  return { basicData, loaderData };
}
