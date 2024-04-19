import { Link } from "react-router-dom";
import Section from "../Section";
import {
  useMediaQuery,
  Image,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";
import MyButton from "../MyButton";
import { AlumniType } from "../../Pages/Alumni";

type Props = {
  alumni: AlumniType;
};

function AlumniCard({ alumni }: Props) {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Section
      screenSizeParameter={isLargerThan900}
      alignItemsCenter={false}
      gapSize={10}
      direction={isLargerThan900 ? "row" : "column"}
    >
      <Image
        src={alumni.photoUrl}
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
          {alumni.name}
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
                  Workshop Completed
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box
                display="flex"
                alignItems="center"
                gap={4}
                flexDirection="column"
              >
                <Text
                  color="#45446A"
                  textDecoration={"underline"}
                  _hover={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://callie-stoscup-s-school.teachable.com/p/project-planning-tool-fullstack",
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  {alumni.workshop.name}
                </Text>
              </Box>
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
                  About {alumni.name.split(" ")[0]}
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <BodyText textBlocks={alumni.bioText} textAlignCenter={false} />
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
                  Open To Work
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <BodyText
                textBlocks={alumni.opportunities}
                textAlignCenter={false}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box
          display="flex"
          gap={4}
          w="100%"
          justifyContent="center"
          flexDirection={isLargerThan500 ? "row" : "column"}
        >
          <Link to={alumni.linkedInUrl} target="_blank">
            <MyButton widthSize="100%">{`Contact ${
              alumni.name.split(" ")[0]
            }`}</MyButton>
          </Link>
          <Link to={alumni.projectUrl} target="_blank">
            <MyButton widthSize="100%">{`Check out ${
              alumni.name.split(" ")[0]
            }'s Project`}</MyButton>
          </Link>
        </Box>
      </Box>
    </Section>
  );
}

export default AlumniCard;
