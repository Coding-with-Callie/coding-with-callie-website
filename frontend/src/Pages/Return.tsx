import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
import { User } from "../Components/Profile/Admin";
import { Workshop } from "./Workshops";

const purchase = [
  "You officially have access to the following Coding with Callie workshops:",
];

const Return = () => {
  const user = useLoaderData() as any;
  const context = useOutletContext() as Context;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    context.updateUser(user);

    axios
      .get(
        `http://localhost:3001/api/auth/session-status?session_id=${sessionId}`
      )
      .then((response) => {
        setStatus(response.data.status);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

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
        <UnorderedList>
          {user.workshops.map((workshop: Workshop) => {
            return <ListItem>{workshop.name}</ListItem>;
          })}
        </UnorderedList>
      </Section>
    );
  }

  return null;
};

export default Return;
