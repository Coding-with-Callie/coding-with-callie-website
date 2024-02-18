import {
  Box,
  useMediaQuery,
  Image,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import Paragraph from "../Components/Paragraph";
import { Context } from "../App";
import { showNotification } from "..";

type Speaker = {
  name: string;
  date: string;
  sessionText: string[];
  bioText: string[];
  websiteUrl: string;
  photoUrl: string;
};

const GuestSpeakers = () => {
  let speakers = useLoaderData() as Speaker[];

  speakers = speakers.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate < bDate) {
      return -1;
    } else {
      return 1;
    }
  });

  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const showToast = () => {
    showNotification("Sign-up to receive the Zoom link!", "info");
  };

  return (
    <Box m={"0 auto"}>
      {speakers.map((speaker) => {
        return (
          <Section
            screenSizeParameter={isLargerThan900}
            alignItemsCenter={false}
            gapSize={10}
            direction={isLargerThan900 ? "row" : "column"}
          >
            <Image
              src={speaker.photoUrl}
              borderRadius="50%"
              h={"250px"}
              boxShadow="lg"
            />
            <Box
              w={isLargerThan900 ? "60%" : "100%"}
              display="flex"
              flexDirection="column"
              gap={6}
            >
              <BodyHeading textAlignCenter={false} removeMargin>
                {speaker.name}
              </BodyHeading>
              <Accordion defaultIndex={[0]} allowToggle borderColor="black">
                <AccordionItem borderColor={"#45446A"}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color={"#45446A"}
                        fontWeight="900"
                      >
                        Meet-up Date
                      </Box>
                      <AccordionIcon color={"#45446A"} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Paragraph>{`${speaker.date} 8PM EST`}</Paragraph>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderColor={"#45446A"}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color={"#45446A"}
                        fontWeight="900"
                      >
                        Session Description
                      </Box>
                      <AccordionIcon color={"#45446A"} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <BodyText
                      textBlocks={speaker.sessionText}
                      textAlignCenter={false}
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderColor={"#45446A"}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color={"#45446A"}
                        fontWeight="900"
                      >
                        About {speaker.name.split(" ")[0]}
                      </Box>
                      <AccordionIcon color={"#45446A"} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <BodyText
                      textBlocks={speaker.bioText}
                      textAlignCenter={false}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Box display="flex" gap={4} w="100%" justifyContent="center">
                <Link to={speaker.websiteUrl} target="_blank">
                  <MyButton>{`Contact ${speaker.name.split(" ")[0]}`}</MyButton>
                </Link>
                {loggedIn ? null : (
                  <Link to="/sign-up">
                    <MyButton onClick={showToast}>Get Zoom Link</MyButton>
                  </Link>
                )}
              </Box>
            </Box>
          </Section>
        );
      })}
    </Box>
  );
};

export default GuestSpeakers;
