import axios from "axios";

const host =
  process.env.REACT_APP_ENV === "production"
    ? `https://${window.location.host}`
    : `http://localhost:3001`;

const axiosPublic = axios.create({
  baseURL: `${host}/api`,
});

axiosPublic.interceptors.response.use(
  (response) => {
    // If the response is an access token, store it in local storage
    // and make a request to the profile endpoint to get the user's data
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);

      try {
        return axiosPrivate.get("/profile");
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return response;
    }
  },
  (error) => {
    let message: string = error.response.data.message;

    // User is trying to register with an email or username that already exists
    if (message === "user already exists") {
      return Promise.reject({
        path: "/log-in",
        message: "User already exists. Please log in instead!",
      });
    }

    // User is trying to log in and entered incorrect credentials
    if (message === "Unauthorized") {
      return Promise.reject({
        message: "You entered incorrect credentials.",
      });
    }

    return Promise.reject(error);
  }
);

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

axiosAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error:", error);
    // Some other error occurred
    return Promise.reject({ message: "There was an error!" });
  }
);

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
      if (config.url === "/user-details") {
        // Add something that will show up in the response to indicate we were trying /user-details
        config.headers["User-Details"] = "true";
      }
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
    let message: string = "";

    if (error.code === "ERR_CANCELED") {
      // There is no token in local storage. User likely does not have an account.
      message = "You must have an account to view that page.";
      return Promise.reject({ path: "/sign-up", message });
    }

    // If the error isn't really an error...
    if (error === "no error" || error.response.config.headers["User-Details"]) {
      return {
        data: {
          message: "no error",
        },
      };
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
    return Promise.reject({ message: "There was an error!" });
  }
);

export { axiosPublic, axiosPrivate, axiosAdmin };
