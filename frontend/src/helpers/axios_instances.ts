import axios from "axios";

const host =
  process.env.REACT_APP_ENV === "production"
    ? `https://${window.location.host}`
    : `http://localhost:3001`;

const axiosPublic = axios.create({
  baseURL: `${host}/api`,
});

const axiosPrivate = axios.create({
  baseURL: `${host}/api/auth`,
});

axiosPrivate.interceptors.request.use(
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

export { axiosPublic, axiosPrivate };
