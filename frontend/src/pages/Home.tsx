import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
const callie = require("../../src/images/callie.png");

const homeText = [
  "I started my career as a Spanish and Math teacher, but I quickly realized that telling kids to get off their phones all day wasn't very fun.",
  "Pretty quickly, I transitioned into instructional design and spent a few years designing and developing eLearning courses. I was pretty dissatified with the eLearning development tools that were available at the time, so I learned to code on the job.",
  "Eventually, I started a business building and selling wood furniture and left my corporate job to pursue it full time. When I had my daughter, I realized that power tools and infants aren't a great pair, so I brushed off my computer and threw myself back into coding.",
  "Currently, I'm a Senior Software Engineer at Moody's Analytics! I love my job a little too much and find it difficult to stop coding after hours. So, I decided to switch it up and spend my after hours coding time on Coding with Callie.",
];

const Home = () => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <Box>
      <Box
        px={4}
        py={20}
        display="flex"
        gap={10}
        alignItems="center"
        flexDirection={isLargerThan700 ? "row" : "column"}
        backgroundColor="#E1E7CD"
      >
        <Image src={callie} borderRadius="50%" h="300px" boxShadow="lg" />
        <Box>
          <BodyHeading text="Hi, I'm Callie 👋🏻" textAlignCenter={false} />
          <BodyText textBlocks={homeText} />
        </Box>
      </Box>
      <Box py={20}>
        <BodyHeading text="Workshops" textAlignCenter={true} />
      </Box>
    </Box>
  );
};

export default Home;
