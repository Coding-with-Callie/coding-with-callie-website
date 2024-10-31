import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import Section from "../Components/Section";
import Resource from "../Components/Home/Resource";
import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "..";
import ResourceForm from "../Components/Home/ResourceForm";
import { useLoaderData } from "react-router-dom";
const callie = require("../../src/images/callie.png");

const homeText = [
  "I started my career as a Spanish and Math teacher, but I quickly realized that telling kids to get off their phones all day wasn't very fun.",
  "Pretty quickly, I transitioned into instructional design and spent a few years designing and developing eLearning courses. I was pretty dissatified with the eLearning development tools that were available at the time, so I learned to code on the job.",
  "Eventually, I started a business building and selling wood furniture and left my corporate job to pursue it full time. When I had my daughter, I realized that power tools and infants aren't a great pair, so I brushed off my computer and threw myself back into coding.",
  "Currently, I'm a Site Reliability Engineer II at HashiCorp! I love coding a little too much and find it difficult to stop coding after hours. So, I decided to switch it up and spend my after hours coding time on Coding with Callie.",
];

export type ResourceType = {
  id: number;
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  bodyText: string[];
  target: boolean;
};

const Home = () => {
  const loaderData = useLoaderData() as ResourceType[];

  const [resources, setResources] = useState<ResourceType[]>(loaderData);
  const [role, setRole] = useState<string | null>(null);

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  useEffect(() => {
    const profileLoader = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(`${host}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data.role;
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          return null;
        }
      } else {
        return null;
      }
    };

    const loadProfile = async () => {
      const userRole = await profileLoader();
      setRole(userRole);
    };

    loadProfile();
  }, []);

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
      {resources.map((resource) => (
        <Resource
          id={resource.id}
          heading={resource.heading}
          imageUrl={resource.imageUrl}
          linkUrl={resource.linkUrl}
          buttonText={resource.buttonText}
          textBlocks={resource.bodyText}
          target={resource.target ? "_blank" : "_self"}
          editable={role === "admin"}
          setResources={setResources}
        />
      ))}
      {role === "admin" && (
        <Box my={20}>
          <ResourceForm setResources={setResources} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
