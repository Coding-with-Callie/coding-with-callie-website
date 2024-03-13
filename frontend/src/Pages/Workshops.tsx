import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
import { Context } from "../App";

const why = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. I made all the quick portfolio projects: weather app, movie list, online clothing store.",
  "When I started my software engineering position, however, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc. So, I decided to start recording myself building fullstack applications from planning to deployment, spending the necessary time to make sure users could actually use them.",
];

const mantra = [
  "You'll see me put this mantra into practice while completing my workshops. A lot of engineers get stuck trying to architect elegant code or make a feature absolutely perfect before making their pull request and it ends up being a detriment to the project. On the flip side, a lot of bootcamps move so quickly, students end up coming up with 80% of a solution they don't have the time to fully understand before moving on and never touching the code again. In my workshops, I try to find the right balance.",
  "My general rule of thumb is to go with the easiest solution to code first. I don't worry about issues until they start being issues. As soon as my code in one area starts to be a problem for another area, then I refactor. I find that this workflow helps me understand in practice a lot of the concepts we're taught in school/bootcamps.",
];

export type Workshop = {
  id: number;
  name: string;
  description: string;
  photo: string;
  details: string[];
  objectives: string[];
  techStack: string[];
  price: number;
  available: boolean;
  stripe_id: string;
};

const Workshops = () => {
  const workshops = useLoaderData() as Workshop[];

  const context = useOutletContext() as Context;
  const loggedIn = context.user.name !== undefined;

  const purchasedWorkshops = context.user.workshops || [];

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" textAlign="center">
          Coding with Callie Workshops
        </Heading>
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          My Workshop Origin Story
        </Heading>
        <BodyText textBlocks={why} textAlignCenter={false} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          Make it work first, and then make it better
        </Heading>
        <BodyText textBlocks={mantra} textAlignCenter={false} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          Let's get to work 💪🏻
        </Heading>
        <Box
          display="flex"
          gap={20}
          flexWrap="wrap"
          justifyContent="center"
          maxW="1000px"
        >
          {workshops.map((workshop) => {
            let access = false;
            if (
              loggedIn &&
              purchasedWorkshops.find((purchasedWorkshop: Workshop) => {
                return purchasedWorkshop.name === workshop.name;
              })
            ) {
              access = true;
            }
            return (
              <Box
                backgroundColor="white"
                borderRadius={4}
                p={10}
                boxShadow="lg"
                flex={1}
                display="flex"
                flexDirection="column"
                gap={10}
                minW="400px"
                maxW="600px"
              >
                <Heading fontSize={28} color="#79A9CD" textAlign="center">
                  {workshop.name}
                </Heading>

                <Text color="#45446A" flex={1}>
                  {workshop.description}
                </Text>

                <Image
                  src={workshop.photo}
                  boxShadow="lg"
                  borderRadius={4}
                  objectFit="cover"
                />

                <Box m="0 auto" display="flex" gap={4}>
                  <Link to={`/workshops/${workshop.id}`}>
                    <MyButton>Learn More</MyButton>
                  </Link>
                  {access && (
                    <Link to={`/resources/${workshop.id}`}>
                      <MyButton>View Resources</MyButton>
                    </Link>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Section>
    </>
  );
};

export default Workshops;
