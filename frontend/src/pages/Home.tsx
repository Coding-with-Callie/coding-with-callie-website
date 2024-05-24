import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import Section from "../Components/Section";
import { difference, mantra, why } from "./Workshops";
import TextWithImageAndButton from "../Components/Home/TextWithImageAndButton";
const callie = require("../../src/images/callie.png");

const homeText = [
  "I started my career as a Spanish and Math teacher, but I quickly realized that telling kids to get off their phones all day wasn't very fun.",
  "Pretty quickly, I transitioned into instructional design and spent a few years designing and developing eLearning courses. I was pretty dissatified with the eLearning development tools that were available at the time, so I learned to code on the job.",
  "Eventually, I started a business building and selling wood furniture and left my corporate job to pursue it full time. When I had my daughter, I realized that power tools and infants aren't a great pair, so I brushed off my computer and threw myself back into coding.",
  "Currently, I'm a Site Reliability Engineer II at HashiCorp! I love coding a little too much and find it difficult to stop coding after hours. So, I decided to switch it up and spend my after hours coding time on Coding with Callie.",
];

const zoomSessions = [
  "We meet on Thursdays from 8PM to 9PM EST.",
  "Each week, we have a guest speaker come to lead a mini-workshop and answer all of your questions about their experience in the software developement industry!",
  "Past guests have included: self-taught developers that successfully broke into tech, engineering managers, product managers, frontend specialists, and more!",
  "Every one is welcome at the meet-ups! You can find the Zoom link on the guest speaker page or the Coding with Callie LinkedIn page.",
];

const projectPlanningTool = [
  "It's important to plan out a project before you start coding! You can do this using the MVP from the project Planning Tool: Fullstack workshop.",
  "First, you want to think about the features your project needs to offer. Then, you can break these features into user stories, the specific actions that your users can take on your application. Lastly, you have to figure out how to build out those user stories. You can break up each user story into doable develop tasks and update them as you go.",
  "Let me know how you like using the tool, if you find any bugs, and any future features that you'd like to see.",
];

const deployInPublicChallenge = [
  "Deploying an application is HARD. Knowing what resources to use, what steps to follow, and what to do when you get stuck can feel impossible.In this 10 week workshop, we'll start simple and work our way up to deploying a fullstack application using AWS, Docker, Kubernetes, Github Actions and more",
  "The Deploy in Public Challenge will be run as a cohort from  May 23, 2024 - August 1, 2024. I'll post a weekly assignment, some helpful resources, and a few hours worth of videos of me working through the assignment.",
  "Why is it called a challenge, though? 🤔",
  "I was able to break into tech AND land my second job in tech through building in public...so I want to encourage others to do the same! Those who finish the workshop by August 1, 2024, will get an opportunity to make money developing Coding with Callie. If you complete the challenge, you'll get access to a list of available 'jobs' with predetermined payment amounts.",
  "Complete a job, get paid 💵",
];

const jobsFund = [
  "Junior developers need experience and deserve to be PAID for their work...and I need help developing Coding with Callie 💡",
  "So, I'm creating a list of Coding with Callie jobs that I would love to see completed...but don't have the time to do: adding new features, fixing bugs, refactoring code, researching tools, frameworks, and libraries, and creating MVPs, tutorials, documentation, etc.",
  "Anyone who successfully COMPLETES a Coding with Callie challenge will be eligible to take on a job and get paid 💰",
  "25% of Coding with Callie profits are going to fund these jobs, but I'd love to be able to fund as many jobs as possible.",
  "If you'd like to donate to the Junior Developer Fund, please click the button below.",
];

const Home = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box>
      <Section
        screenSizeParameter={isLargerThan700}
        alignItemsCenter={true}
        gapSize={10}
        direction={isLargerThan900 ? "row" : "column"}
      >
        <Image
          src={callie}
          borderRadius="50%"
          h={isLargerThan500 ? "350px" : "280px"}
          boxShadow="lg"
        />
        <Box>
          <BodyHeading textAlignCenter={false}>Hi, I'm Callie 👋🏻</BodyHeading>
          <BodyText textBlocks={homeText} textAlignCenter={false} />
        </Box>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={"Donate to the Junior Developer Jobs Fund"}
          imageUrl={"https://coding-with-callie.s3.amazonaws.com/donate.jpeg"}
          linkUrl={
            "https://pages.donately.com/codingwithcallie/campaign/junior-developer-jobs-fund"
          }
          buttonText={"Donate!"}
        >
          <BodyText textBlocks={jobsFund} textAlignCenter={false} />
        </TextWithImageAndButton>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={"Plan Your Projects"}
          imageUrl={
            "https://coding-with-callie.s3.amazonaws.com/planning_a_project.jpeg"
          }
          linkUrl="/projects"
          buttonText={"Check it out!"}
        >
          <BodyText textBlocks={projectPlanningTool} textAlignCenter={false} />
        </TextWithImageAndButton>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={"Build a Fullstack Project with Me"}
          imageUrl={
            "https://coding-with-callie.s3.amazonaws.com/wire_frame.png"
          }
          linkUrl="https://callie-stoscup-s-school.teachable.com/p/project-planning-tool-fullstack"
          buttonText={"Let's get to work!"}
        >
          <Box flex={1}>
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
                      My Workshop Origin Story
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
                    <BodyText textBlocks={why} textAlignCenter={false} />
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
                      Make it work first, and then make it better
                    </Box>
                    <AccordionIcon color={"#45446A"} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <BodyText textBlocks={mantra} textAlignCenter={false} />
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
                      What sets Coding with Callie workshops apart?
                    </Box>
                    <AccordionIcon color={"#45446A"} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <BodyText textBlocks={difference} textAlignCenter={false} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </TextWithImageAndButton>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={"Deploy in Public"}
          imageUrl={
            "https://coding-with-callie.s3.amazonaws.com/deployment.png"
          }
          linkUrl="https://callie-stoscup-s-school.teachable.com/p/deploy-in-public-challenge"
          buttonText={"Join the cohort!"}
        >
          <BodyText
            textBlocks={deployInPublicChallenge}
            textAlignCenter={false}
          />
        </TextWithImageAndButton>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={"Network with Industry Professionals"}
          imageUrl={"https://coding-with-callie.s3.amazonaws.com/meet-up.png"}
          linkUrl="/guest-speakers"
          buttonText={"View Guest Speakers!"}
        >
          <BodyText textBlocks={zoomSessions} textAlignCenter={false} />
        </TextWithImageAndButton>
      </Section>
    </Box>
  );
};

export default Home;
