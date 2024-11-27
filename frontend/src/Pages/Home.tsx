import { Box } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import Resources from "../Components/Home/Resources";
import callie from "../images/callie.png";
import PhotoAndText from "../Components/Home/PhotoAndText";

const text = [
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
  order: number;
};

const Home = () => {
  const resources = useLoaderData() as ResourceType[];

  const { user } = useOutletContext() as Context;

  return (
    <Box>
      <PhotoAndText heading="Hi, I'm Callie 👋🏻" text={text} image={callie} />
      <Resources data={resources} role={user.role} />
    </Box>
  );
};

export default Home;
