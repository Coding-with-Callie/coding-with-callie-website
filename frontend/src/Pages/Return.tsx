import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import { Box, Heading, Text } from "@chakra-ui/react";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
import { Workshop } from "./Workshops";
import MyButton from "../Components/MyButton";

const purchase = [
  "You officially have access to the following Coding with Callie workshops:",
];

const Return = () => {
  const context = useOutletContext() as Context;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    axios
      .get(
        `http://localhost:3001/api/auth/session-status?session_id=${sessionId}`
      )
      .then((response) => {
        setStatus(response.data.status);

        const token = window.localStorage.getItem("token");

        axios
          .get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001/api"
            }/auth/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            window.localStorage.removeItem("temp-cart");
            context.updateUser(response.data);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "complete") {
    return (
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading
          fontSize={28}
          mb={6}
          color="#79A9CD"
          w="100%"
          textAlign="center"
        >
          Thank you for your business!
        </Heading>
        <BodyText textBlocks={purchase} textAlignCenter={false} />
        <Box w="60%" mt={6}>
          {context.user.workshops.map((workshop: Workshop) => {
            return (
              <Box display="flex" justifyContent="space-between">
                <Text color="#45446A">{workshop.name}</Text>
                <Link to={`/resources/${workshop.id}`}>
                  <MyButton>Resources</MyButton>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Section>
    );
  } else {
    return null;
  }
};

export default Return;
