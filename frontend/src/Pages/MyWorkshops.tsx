import { Box, Heading, Text } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import MyButton from "../Components/MyButton";
import { Workshop } from "./Workshops";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";

const access = ["You have access to following Coding with Callie workshops:"];

const MyWorkshops = () => {
  const context = useOutletContext() as Context;

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading
          fontSize={28}
          mb={6}
          color="#79A9CD"
          w="100%"
          textAlign="center"
        >
          {`${context.user.name}'s Workshops`}
        </Heading>
        <BodyText textBlocks={access} textAlignCenter={false} />
        <Box w="60%" mt={6}>
          {context.user.workshops.map((workshop: Workshop) => {
            return (
              <Box display="flex" justifyContent="space-between" mb={6}>
                <Text color="#45446A">{workshop.name}</Text>
                <Link to={`/resources/${workshop.id}`}>
                  <MyButton>Resources</MyButton>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Section>
    </Box>
  );
};

export default MyWorkshops;
