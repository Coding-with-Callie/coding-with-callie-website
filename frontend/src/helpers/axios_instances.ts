import axios from "axios";

const host =
  process.env.REACT_APP_ENV === "production"
    ? `https://${window.location.host}`
    : `http://localhost:3001`;

const axiosPublic = axios.create({
  baseURL: `${host}/api`,
});

const axiosAdmin = axios.create({
  baseURL: `${host}/api/admin`,
});

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      source.cancel("No token provided"); // Cancel the request
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosPrivate = axios.create({
  baseURL: `${host}/api/auth`,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (config.url === "/user-details") {
        return Promise.reject("no error");
      }
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      source.cancel("No token provided"); // Cancel the request
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the error isn't really an error...
    if (error === "no error") {
      return {
        data: {
          message: "no error",
        },
      };
    }

    let message: string = "";

    if (error.code === "ERR_CANCELED") {
      // There is no token in local storage. User likely does not have an account.
      message = "You must have an account to view that page.";
      return Promise.reject({ path: "/sign-up", message });
    }

    // User has a token, but it is invalid. User's session has expired.
    if (error.response.status === 401) {
      message = error.response.data.message;
      // User requested a project they do not have access to
      if (message === "You do not have access to that project.") {
        return Promise.reject({ path: "/projects", message });
      }

      message = "It looks like your session has expired. Please log in again!";
      return Promise.reject({ path: "/log-in", message });
    }

    // Some other error occurred
    return Promise.reject({ path: "/sign-up" });
  }
);

export { axiosPublic, axiosPrivate, axiosAdmin };
