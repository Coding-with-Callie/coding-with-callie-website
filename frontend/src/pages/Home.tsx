import { Avatar, Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
const callie = require("../../src/callie.jpeg");

const Home = () => {
  return (
    <Box px={4} py={10}>
      <Box display="flex" gap={10}>
        <Image src={callie} border="2px solid" borderRadius="50%" h="300px" />
        <Box>
          <Text fontSize={22}>Hi, I'm Callie 👋🏻</Text>
          <Text fontSize={14} my={4}>
            I started my career as a Spanish and Math teacher, but I quickly
            realized that telling kids to get off their phones all day wasn't
            very fun.
          </Text>
          <Text fontSize={14} my={4}>
            Pretty quickly, I transitioned into instructional design and spent a
            few years designing and developing eLearning courses. I was pretty
            dissatified with the eLearning development tools that were available
            at the time, so I learned to code on the job.
          </Text>
          <Text fontSize={14} my={4}>
            Eventually, I started a business building and selling wood furniture
            and left my corporate job to pursue it full time. When I had my
            daughter, I realized that power tools and infants aren't a great
            pair, so I brushed off my computer and threw myself back into
            coding.
          </Text>
          <Text fontSize={14} my={4}>
            Currently, I'm a Senior Software Engineer at Moody's Analytics! I
            love my job a little too much and find it difficult to stop coding
            after hours. So, I decided to switch it up and spend my after hours
            coding time on Coding with Callie.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
