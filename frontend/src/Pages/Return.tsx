import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    axios
      .get(
        `http://localhost:3001/api/auth/session-status?session_id=${sessionId}`
      )
      .then((response) => {
        console.log("RESPONSE", response.data);
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      });
  }, []);

  console.log("STATUS", status);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return <div>We appreciate your business!</div>;
  }

  return null;
};

export default Return;
