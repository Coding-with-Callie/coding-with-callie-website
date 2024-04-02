import { Box, ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { Workshop } from "./Workshops";
import axios from "axios";
import { showNotification } from "..";

// const moreInformation = [
//   "This workshop is self-paced. Complete the assignments as you have time and use my solution videos if you get stuck!",
//   "For some extra motivation, if you complete the workshop by April 11, 2024, you will be eligible to participate in Coding with Callie's first Interview Day! During Interview Day, you will be interviewing for one of two open internships at Anchor Web Studio.",
//   "You must be part of the Coding with Callie community to access to the workshop assignments, community feedback features, and the solution videos.",
// ];

const WorkshopDetails = () => {
  const workshop = useLoaderData() as Workshop;

  const [isLargerThan1090] = useMediaQuery("(min-width: 1090px)");

  const context: Context = useOutletContext();
  const navigate = useNavigate();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;
  const tokenExists = localStorage.getItem("token") !== null;

  const addToCart = () => {
    if (loggedIn) {
      const token = window.localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3001/api/auth/add-workshop-to-cart",
          {
            workshopId: workshop.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          context.updateUser(response.data);
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to add a Coding with Callie workshop to your cart!",
              "error"
            );
            navigate("/log-in");
          } else {
            let message: string = error.response.data.message;
            showNotification(`${message}`, "error");
          }
        });
    }

    let cart: any = window.localStorage.getItem("temp-cart");

    if (cart) {
      cart = JSON.parse(cart);
      if (Array.isArray(cart)) {
        if (cart.find((item) => item.name === workshop.name)) {
          showNotification(
            "You already have ths workshop in this cart",
            "error"
          );
        } else {
          cart.push(workshop);
        }
      }
    } else {
      cart = [workshop];
    }

    window.localStorage.setItem("temp-cart", JSON.stringify(cart));
    context.updateUser({});
    showNotification("The workshop has been added to your cart", "success");
  };

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          {`${workshop.name} Workshop Details`}
        </BodyHeading>
        <BodyText textBlocks={workshop.details} textAlignCenter={false} />
      </Section>
      <Section
        screenSizeParameter={isLargerThan1090}
        alignItemsCenter={false}
        gapSize={20}
        direction={isLargerThan1090 ? "row" : "column"}
      >
        <Box w="50%">
          <BodyHeading textAlignCenter={!isLargerThan1090}>
            You can expect to learn how to:
          </BodyHeading>
          <UnorderedList color="#45446A">
            {workshop.objectives.map((objective) => {
              return <ListItem>{objective}</ListItem>;
            })}
          </UnorderedList>
        </Box>
        <Box>
          <BodyHeading textAlignCenter={!isLargerThan1090}>
            To complete this workshop, I will be using:
          </BodyHeading>
          <UnorderedList color="#45446A">
            {workshop.techStack.map((tool) => {
              return <ListItem>{tool}</ListItem>;
            })}
          </UnorderedList>
        </Box>
      </Section>

      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Box display="flex" gap={10}>
          {workshop ? (
            <MyButton onClick={addToCart}>Add to Cart</MyButton>
          ) : (
            <Link
              to={
                loggedIn ? "/resources" : tokenExists ? "/log-in" : "/sign-up"
              }
            >
              <MyButton>
                {loggedIn
                  ? "View Todo List Resources"
                  : tokenExists
                    ? "Sign in"
                    : "Create an Account"}
              </MyButton>
            </Link>
          )}
          <Link to="/workshops">
            <MyButton>Return to Workshops</MyButton>
          </Link>
        </Box>
      </Section>
    </>
  );
};

export default WorkshopDetails;
