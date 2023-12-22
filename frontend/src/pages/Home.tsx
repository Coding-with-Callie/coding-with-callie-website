import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import CenteredColumn from "../Components/CenteredColumn";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
const callie = require("../../src/images/callie.png");

const homeText = [
  "I started my career as a Spanish and Math teacher, but I quickly realized that telling kids to get off their phones all day wasn't very fun.",
  "Pretty quickly, I transitioned into instructional design and spent a few years designing and developing eLearning courses. I was pretty dissatified with the eLearning development tools that were available at the time, so I learned to code on the job.",
  "Eventually, I started a business building and selling wood furniture and left my corporate job to pursue it full time. When I had my daughter, I realized that power tools and infants aren't a great pair, so I brushed off my computer and threw myself back into coding.",
  "Currently, I'm a Senior Software Engineer at Moody's Analytics! I love my job a little too much and find it difficult to stop coding after hours. So, I decided to switch it up and spend my after hours coding time on Coding with Callie.",
];

const workshopText = [
  "Coding with Callie's first workshop starts Thursday, January 18.",
  "Over the course of 10 weeks, we'll build a Todo List application. This is a guided workshop meant for those want to learn how to build usable applications.",
];

const codeReviewsText = [
  "Sometimes it's hard to know where to refactor or what to work on next when you're coding alone.",
  "Having someone else take a look at your code can help you level up! Plus, learning how to do a code review yourself is a necessary a part of the day-to-day work for a software engineer.",
];

const coffeeChatsText = [
  "Networking was an essential part of my breaking into tech. So many software engineers took time out of their day to talk with me about their experience and answer some of my questions.",
  "Use coffee chats to learn what it's like on the job, find potentials mentors, and practice talking about code.",
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
      <Section
        screenSizeParameter={isLargerThan900}
        alignItemsCenter={false}
        gapSize={10}
      >
        <CenteredColumn>
          <BodyHeading textAlignCenter={true}>Workshops</BodyHeading>
          <BodyText textBlocks={workshopText} textAlignCenter={true} />
          <Link to="/workshop-details">
            <MyButton>Learn More</MyButton>
          </Link>
        </CenteredColumn>
        <CenteredColumn>
          <BodyHeading textAlignCenter={true}>Code Reviews</BodyHeading>
          <BodyText textBlocks={codeReviewsText} textAlignCenter={true} />
          <MyButton>Learn More</MyButton>
        </CenteredColumn>
        <CenteredColumn>
          <BodyHeading textAlignCenter={true}>Coffee Chats</BodyHeading>
          <BodyText textBlocks={coffeeChatsText} textAlignCenter={true} />
          <MyButton>Learn More</MyButton>
        </CenteredColumn>
      </Section>
    </Box>
  );
};

export default Home;
