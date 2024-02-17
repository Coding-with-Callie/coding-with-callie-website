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
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import Paragraph from "../Components/Paragraph";
import { Context } from "../App";
import { showNotification } from "..";
const michaelduran = require("../../src/images/michaelduran.jpeg");

type Speaker = {
  name: string;
  date: string;
  sessionText: string[];
  bioText: string[];
  websiteUrl: string;
  photoUrl: string;
};

const data: Speaker[] = [
  {
    name: "Michael Duran",
    date: "February 29, 2024 8PM EST",
    sessionText: [
      "Join me as I break down the cool ways we use HTML, CSS, and JavaScript to make sure everyone can get around our digital world at USAA, no matter what. We're all about knocking down barriers and building up a web that's open for all.",
      "I'll share some behind-the-scenes tricks and tales of how these tech tools help us roll out the welcome mat online. Get ready for a casual chat on making tech accessible and why it matters to everyone in our community.",
      "See you there!",
    ],
    bioText: [
      "Hey there! I'm the self-taught coding wizard behind the screens at USAA, where I sprinkle my magic on the Frontend using the classic trifecta: HTML, CSS, and JavaScript. By day, I'm weaving through code, and by night, I shift gears to become a dedicated husband and a superhero dad to an energetic 5-year-old who's likely to code circles around me in the future.",
      "My journey into the tech world is backed by a Bachelor's in Media Communications, and I'm currently leveling up with an Associate's in Computer Science. While my daily grind is all about the front-end, I don’t shy away from diving into other areas. I'm well-versed in React.js for that extra spice in front-end development and have a knack for Java, because who says you can't have the best of both worlds?",
      "Outside of my tech endeavors, you'll find me living the best of both worlds – whether I'm lost in the latest gaming adventure, mastering the art of Muay Thai, or taking refreshing walks to recharge.",
      "My life is a unique tapestry of code, gaming kicks, and precious family moments, proving that blending passion with profession and personal life is not just possible but incredibly rewarding.",
      "Let's connect and share our journeys!",
    ],
    websiteUrl: "https://www.linkedin.com/in/michael-duran-b5b002203/",
    photoUrl: "https://coding-with-callie.s3.amazonaws.com/michaelduran.jpeg",
  },
];

const GuestSpeakers = () => {
  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;

  const [speakers, setSpeakers] = useState(data);

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const showToast = () => {
    showNotification("Sign-up to receive the Zoom link!", "info");
  };

  return (
    <Box m={"0 auto"}>
      {speakers.map((speaker) => {
        console.log("SPEAKER", speaker);
        return (
          <Section
            screenSizeParameter={isLargerThan700}
            alignItemsCenter={false}
            gapSize={10}
            direction={isLargerThan900 ? "row" : "column"}
          >
            <Image
              src={michaelduran}
              borderRadius="50%"
              h={isLargerThan500 ? "250px" : "280px"}
              boxShadow="lg"
            />
            <Box w="60%" display="flex" flexDirection="column" gap={6}>
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
                    <Paragraph>{speaker.date}</Paragraph>
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
                        About Michael
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
              </Accordion>
              <Box display="flex" gap={4} w="100%" justifyContent="center">
                <Link
                  to="https://www.linkedin.com/in/michael-duran-b5b002203/"
                  target="_blank"
                >
                  <MyButton>Contact Michael</MyButton>
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
