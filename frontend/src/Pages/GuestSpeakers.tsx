import {
  Box,
  useMediaQuery,
  Image,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import Section from "../Components/Section";
const michaelduran = require("../../src/images/michaelduran.jpeg");

const homeText = [
  "Hey there! I'm the self-taught coding wizard behind the screens at USAA, where I sprinkle my magic on the Frontend using the classic trifecta: HTML, CSS, and JavaScript. By day, I'm weaving through code, and by night, I shift gears to become a dedicated husband and a superhero dad to an energetic 5-year-old who's likely to code circles around me in the future.",
  "My journey into the tech world is backed by a Bachelor's in Media Communications, and I'm currently leveling up with an Associate's in Computer Science. While my daily grind is all about the front-end, I don’t shy away from diving into other areas. I'm well-versed in React.js for that extra spice in front-end development and have a knack for Java, because who says you can't have the best of both worlds?",
  "Outside of my tech endeavors, you'll find me living the best of both worlds – whether I'm lost in the latest gaming adventure, mastering the art of Muay Thai, or taking refreshing walks to recharge.",
  "My life is a unique tapestry of code, gaming kicks, and precious family moments, proving that blending passion with profession and personal life is not just possible but incredibly rewarding.",
  "Let's connect and share our journeys!",
];

const GuestSpeakers = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box m={"0 auto"}>
      <Section
        screenSizeParameter={isLargerThan700}
        alignItemsCenter={true}
        direction={isLargerThan900 ? "row" : "column"}
      >
        <BodyHeading textAlignCenter={false}>Michael Duran</BodyHeading>
      </Section>

      <Section
        screenSizeParameter={isLargerThan700}
        alignItemsCenter={true}
        gapSize={10}
        direction={isLargerThan900 ? "row" : "column"}
      >
        <Image
          src={michaelduran}
          borderRadius="50%"
          h={isLargerThan500 ? "250px" : "280px"}
          boxShadow="lg"
        />
        <Box w="60%">
          <Box display="flex" w="100%">
            <Text w="30%">Meet-up Date:</Text>
            <Text>February 29, 2024</Text>
          </Box>
          <Accordion defaultIndex={[0]} allowMultiple borderColor="black">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Session Description
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}></AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    About Michael
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {homeText.map((item) => {
                  return <Text mb={3}>{item}</Text>;
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Section>
      <Box>
        <BodyText textBlocks={homeText} textAlignCenter={false} />
      </Box>
    </Box>
  );
};

export default GuestSpeakers;

{
  /* <Box display="flex" border="1px" justifyContent="space-between">
<Paragraph bold>Meet-up Date:</Paragraph>
<Paragraph>February 29, 2024</Paragraph>
</Box>
<Box display="flex" border="1px" justifyContent="space-between">
<Paragraph bold>Topic:</Paragraph>
<Paragraph>
  Join me as I break down the cool ways we use HTML, CSS, and
  JavaScript to make sure everyone can get around our digital world
  at USAA, no matter what. We're all about knocking down barriers
  and building up a web that's open for all. I'll share some
  behind-the-scenes tricks and tales of how these tech tools help us
  roll out the welcome mat online. Get ready for a casual chat on
  making tech accessible and why it matters to everyone in our
  community. See you there!
</Paragraph>
</Box> */
}
