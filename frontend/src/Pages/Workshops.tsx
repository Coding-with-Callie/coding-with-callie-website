import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";

export const why = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. I made all the quick portfolio projects: weather app, movie list, online clothing store, etc.",
  "When I started my software engineering position, however, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc. So, I decided to start recording myself building fullstack applications from planning to deployment, spending the necessary time to make sure users could actually use them.",
];

export const mantra = [
  "You'll see me put this mantra into practice while completing my workshops. A lot of engineers get stuck trying to architect elegant code or make a feature absolutely perfect before making their pull request and it ends up being a detriment to the project. On the flip side, a lot of bootcamps move so quickly, students end up coming up with 80% of a solution they don't have the time to fully understand before moving on and never touching the code again. In my workshops, I try to find the right balance.",
  "My general rule of thumb is to go with the easiest solution to code first. I don't worry about issues until they start being issues. As soon as my code in one area starts to be a problem for another area, I refactor. I find that this workflow helps me understand in practice a lot of the concepts we're taught in school/bootcamps.",
];

export const difference = [
  "When I'm learning something new, it's hard for me to understand how the author of an article or developer in a video came up with their code. I find myself thinking that I understand, but then not being able to implement a similar solution without copying and pasting. At work, I've noticed that pair programming works a little differently. Your mentor doesn't spend hours crafting the perfect code for the ticket you're working on and then write out scripts to explain it. No, they hop on a call with you and think aloud.",
  "I wondered if it would help to watch a developer as they think through, plan out, and hack together a project. My goal isn't to teach you how to write perfect code on the first try. Instead, it is to teach you how to quickly develop usable MVPs, problem solve when you hit a roadblock, and learn a new tech stack in a practical setting.",
  "That's why I record myself developing the entire project from planning to testing and through deployment. While I may research a new library or framework prior to pressing record or pause recording if it's going to take me too long to Google my way out of a jam, you'll see me debug, think through different game plans, hack an initial solution together, make mistakes, and refactor my code.",
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
};

const openWorkshopInNewTab = (name: string) => {
  if (name === "Build in Public Challenge") {
    window.open(
      "https://callie-stoscup-s-school.teachable.com/p/build-in-public-challenge",
      "_blank",
      "noreferrer"
    );
  } else {
    window.open(
      "https://callie-stoscup-s-school.teachable.com/p/deploy-in-public-challenge",
      "_blank",
      "noreferrer"
    );
  }
};

const Workshops = () => {
  const workshops = useLoaderData() as Workshop[];

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
        <BodyText textBlocks={why} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          Make it work first, and then make it better
        </Heading>
        <BodyText textBlocks={mantra} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          What sets Coding with Callie workshops apart?
        </Heading>
        <BodyText textBlocks={difference} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Heading fontSize={28} mb={6} color="#79A9CD" w="100%">
          Let's get to work 💪🏻
        </Heading>
        {workshops.length > 0 ? (
          <Box
            display="flex"
            gap={20}
            flexWrap="wrap"
            justifyContent="center"
            maxW="1000px"
          >
            {workshops.map((workshop, index) => {
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
                  maxW="600px"
                  minW="320px"
                  key={index}
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
                    <MyButton
                      onClick={() => {
                        openWorkshopInNewTab(workshop.name);
                      }}
                    >
                      Learn More
                    </MyButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box>There are no workshops yet...</Box>
        )}
      </Section>
    </>
  );
};

export default Workshops;
