import {
  Box,
  ListItem,
  Text,
  UnorderedList,
  useMediaQuery,
} from "@chakra-ui/react";
import Section from "../Components/Section";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  const openJobsChannel = () => {
    window.open("https://forms.gle/aJkuGadQMpoJZFqb8", "_blank");
  };
  return (
    <Box
      maxW={isLargerThan900 ? "80%" : isLargerThan450 ? "90%" : "100%"}
      backgroundColor="white"
      p={isLargerThan450 ? 5 : 1}
      borderRadius={4}
      my={isLargerThan450 ? 10 : 0}
      mx={"auto"}
      boxShadow="lg"
    >
      <Box mt={5}>
        <BodyHeading textAlign="center">Developer Jobs Policy</BodyHeading>
      </Box>
      <Section>
        <BodyHeading>Eligibility</BodyHeading>
        <Text color="#45446A" mb={4}>
          To be eligible for a Coding with Callie development ticket, you must
          have completed either the{" "}
          <span style={{ textDecoration: "underline" }}>
            <Link
              to="https://callie-stoscup-s-school.teachable.com/p/deploy-in-public-challenge-8-8"
              target="_blank"
            >
              Deploy in Public
            </Link>
          </span>{" "}
          or{" "}
          <span style={{ textDecoration: "underline" }}>
            <Link
              to="https://callie-stoscup-s-school.teachable.com/p/build-in-public-challenge-8-8"
              target="_blank"
            >
              Build in Public
            </Link>
          </span>{" "}
          workshop. Once you have completed one of these workshops, you can
          request to join the #jobs channel in the Coding with Callie slack
          community by clicking on the button below. Once you have joined the
          channel, you will be able to apply and be considered for available
          development tickets.
        </Text>
      </Section>
      <Section>
        <BodyHeading>Selection Process</BodyHeading>
        <Text color="#45446A" mb={4}>
          Development ticket opportunities will be posted in the #jobs channel
          with a link to their application. To apply, you must fill out the
          application form within 24 hours of the posting. Callie will select a
          developer for the job and contact them.
        </Text>
        <Text color="#45446A" mb={4}>
          The selected developer will have 24 hours to either accept or pass on
          the development ticket. If they do not respond to the job offer,
          Callie will either repost the job or select another applicant.
        </Text>
        <Text color="#45446A" mb={4}>
          Upon acceptance of a development ticket, you will be added to the
          relevant Github repository for the time you are working on that
          ticket.
        </Text>
      </Section>
      <Section>
        <BodyHeading>Ticket Completion and Validation</BodyHeading>
        <Text color="#45446A" mb={4}>
          The ticket will include a general summary of the work, the acceptance
          criteria for the task, a date on which the task must be completed, and
          a payment amount to be paid when your code is merged into the main
          branch of the relevant Github repository.
        </Text>
        <Text color="#45446A" mb={4}>
          A task is complete when you have submitted a pull request to the main
          branch with a description of the work you have completed and proof
          that your code meets all of the acceptance criteria in the ticket in
          the form of unit tests, screenshots, gifs, etc.
        </Text>
        <Text color="#45446A" mb={4}>
          If the task is not completed by the deadline or submitted but does not
          meet all of the acceptance criteria, you will no longer be assigned to
          the development ticket and potentially be ineligible for future Coding
          with Callie jobs.
        </Text>
        <Text color="#45446A" mb={4}>
          Once you have submitted your pull request, Callie will perform a code
          review on your pull request within 72 hours. Code reviews have three
          potential outcomes. Callie could:
        </Text>
        <UnorderedList px={5} mb={4}>
          <ListItem color="#45446A">
            Approve your pull request, merge your code in the main branch, and
            Venmo you the payment amount listed on the ticket,
          </ListItem>
          <ListItem color="#45446A">Request changes to your code, or</ListItem>
          <ListItem color="#45446A">
            Decline your pull request (acceptance criteria was not met or code
            requires excessive refactoring)
          </ListItem>
        </UnorderedList>
        <Text color="#45446A" mb={4}>
          If changes are requested, you have one week to refactor your code and
          request a new code review. If further refactoring is needed, it is up
          to the discretion of Coding with Callie mentor whether or not to
          request changes or decline the pull request.
        </Text>
        <Text color="#45446A" mb={4}>
          You can be removed at any time from the Coding with Callie jobs list
          due to unsatisfactory work or actions that may negatively impact the
          reputation of Coding with Callie.
        </Text>
      </Section>
      <Section>
        <Text color="#45446A" mb={4}>
          By joining the #jobs channel, you are agreeing to the terms of this
          policy:
        </Text>
        <MyButton onClick={openJobsChannel}>Join the #jobs channel!</MyButton>
      </Section>
      <Section>
        <Text color="#45446A" mb={4} textAlign="center">
          This policy is subject to change as Coding with Callie evolves.
        </Text>
      </Section>
    </Box>
  );
};

export default Jobs;
