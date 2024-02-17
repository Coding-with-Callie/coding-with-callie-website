import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import CenteredColumn from "../Components/CenteredColumn";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { Context } from "../App";
const callie = require("../../src/images/callie.png");

const homeText = [
  "I started my career as a Spanish and Math teacher, but I quickly realized that telling kids to get off their phones all day wasn't very fun.",
  "Pretty quickly, I transitioned into instructional design and spent a few years designing and developing eLearning courses. I was pretty dissatified with the eLearning development tools that were available at the time, so I learned to code on the job.",
  "Eventually, I started a business building and selling wood furniture and left my corporate job to pursue it full time. When I had my daughter, I realized that power tools and infants aren't a great pair, so I brushed off my computer and threw myself back into coding.",
  "Currently, I'm a Senior Software Engineer at Moody's Analytics! I love my job a little too much and find it difficult to stop coding after hours. So, I decided to switch it up and spend my after hours coding time on Coding with Callie.",
];

const workshopText = [
  "I'm currently offering 1 self-paced workshop: Fullstack Todo List.",
  "You can use my wireframe designs and project plans to build a fullstack, usable Todo List application with user authentication, error handling, data validation, logging, and more.",
  "This workshop is broken into 11 self-paced assignments with dozens of hours worth of how-to videos to help you if you get stuck.",
  "Want to level up? Try to build the application in a different tech stack! Or add a few bonus features!",
  "I have plans for many more workshops, so check back in to see new offerings as they are available.",
];

const zoomSessions = [
  "We meet on Thursdays from 7PM to 9PM EST.",
  "The first hour of our meet-up is dedicated to peer code reviews and office hours with me! I'm available to answer any questions about Coding with Callie, the Todo List Workshop, or to help debug your code or explain a complicated topic.",
  "For the second hour of the meet-up, we will have a guest speaker come to lead a mini-workshop and answer all of your questions about their experience in the software developement industry!",
  "All Coding with Callie members are eligible to join the weekly meet-ups! You will received a zoom link via email when you sign up.",
];

const guestSpeaker = [
  "I'm looking for volunteer guest speakers!",
  "Every Thursday, the Coding with Callie community meets from 7PM to 9PM EST. While the first hour of the meet-up is reserved for office hours and peer code reviews, the 8PM to 9PM time slot is reserved for a guest speaker!",
  "Guest speakers will have 30 minutes to give a talk about their specialty and then take questions for 30 minutes.",
];

const interviewDay = [
  "Want to help entry-level developers level up? Consider signing up to conduct practice interviews on Coding with Callie Interview day!",
  "Any Coding with Callie member that completes their Todo List application by April 11, 2023 will be eligible to attend.",
  "I am looking for each developer to have the opportunity to practice three types of interviews: phone screen, soft skills, and technical/whiteboard.",
];

const Home = () => {
  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;

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
        <BodyHeading textAlignCenter={false}>Junior Developers 👩🏻‍💻</BodyHeading>
        <Box
          display="flex"
          mt={4}
          gap={20}
          flexDirection={isLargerThan900 ? "row" : "column"}
        >
          <CenteredColumn>
            <BodyHeading textAlignCenter={true}>
              Fullstack Workshops
            </BodyHeading>
            <BodyText textBlocks={workshopText} textAlignCenter={true} />
            <Link to="/workshop-details">
              <MyButton>Learn More</MyButton>
            </Link>
          </CenteredColumn>
          <CenteredColumn>
            <BodyHeading textAlignCenter={true}>Meet-ups</BodyHeading>
            <BodyText textBlocks={zoomSessions} textAlignCenter={true} />
            <Box display="flex" gap={4}>
              <Link to="/guest-speakers">
                <MyButton>View Guest Speakers</MyButton>
              </Link>
              {loggedIn ? null : (
                <Link to="/sign-up">
                  <MyButton>Join the Fun!</MyButton>
                </Link>
              )}
            </Box>
          </CenteredColumn>
        </Box>
      </Section>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={false}>
          Mid-Senior Level Industry Professionals 🙋🏻‍♀️
        </BodyHeading>
        <Box
          display="flex"
          mt={4}
          gap={20}
          flexDirection={isLargerThan900 ? "row" : "column"}
        >
          <CenteredColumn>
            <BodyHeading textAlignCenter={true}>Guest Speaker</BodyHeading>
            <BodyText textBlocks={guestSpeaker} textAlignCenter={true} />
            <Link to="https://forms.gle/82eVomETpuxZvYvq9" target="_blank">
              <MyButton>Volunteer!</MyButton>
            </Link>
          </CenteredColumn>
          <CenteredColumn>
            <BodyHeading textAlignCenter={true}>Interview Day</BodyHeading>
            <BodyText textBlocks={interviewDay} textAlignCenter={true} />
            <Link to="https://forms.gle/ExTwAedgTQYeQkem8" target="_blank">
              <MyButton>Volunteer!</MyButton>
            </Link>
          </CenteredColumn>
        </Box>
      </Section>
    </Box>
  );
};

export default Home;
