import React from "react";
import { Speaker } from "../../Pages/GuestSpeakers";
import {
  Center,
  Divider,
  Flex,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import SpeakerCard from "./SpeakerCard";
import BodyHeading from "../BodyHeading";
import Section from "../Section";

interface Props {
  speakers: Speaker[];
}
const UpcomingCarousel = ({ speakers }: Props) => {
  const [activeSpeaker, setActiveSpeaker] = React.useState(0);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");

  speakers = speakers.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Section screenSizeParameter={isLargerThan1200} alignItemsCenter={true}>
      {speakers.length > 0 && (
        <Flex
          w={isLargerThan480 ? "80%" : "100%"}
          flexDirection="column"
          justifyContent="center"
          mb={4}
        >
          <BodyHeading textAlign="center">Upcoming Speakers</BodyHeading>
          <Center>
            <Divider
              w="100%"
              orientation="horizontal"
              borderColor="black"
              mb={4}
            />
          </Center>
          {speakers.length > 1 && (
            <Flex gap={4}>
              {/*Don't show previous button or speaker if on the
                            first speaker*/}
              <Flex w="50%" alignItems="center" justifyContent="flex-end">
                {activeSpeaker > 0 && (
                  <>
                    <IconButton
                      aria-label="Previous Speaker"
                      icon={<ArrowLeftIcon />}
                      variant="ghost"
                      onClick={() => setActiveSpeaker(activeSpeaker - 1)}
                    />
                    {/*Only show previous speaker preview on
                                        larger screens*/}
                    {isLargerThan1200 && (
                      <SpeakerCard
                        key={speakers[activeSpeaker - 1].id}
                        speaker={speakers[activeSpeaker - 1]}
                      />
                    )}
                  </>
                )}
              </Flex>
              <SpeakerCard
                key={speakers[activeSpeaker].id}
                speaker={speakers[activeSpeaker]}
              />
              {/*Don't show next button or speaker if on the last
                            speaker*/}
              <Flex w="50%" alignItems="Center">
                {activeSpeaker < speakers.length - 1 && (
                  <>
                    {/*Only show next speaker preview on
                                        larger screens*/}
                    {isLargerThan1200 && (
                      <SpeakerCard
                        key={speakers[activeSpeaker + 1].id}
                        speaker={speakers[activeSpeaker + 1]}
                      />
                    )}
                    <IconButton
                      aria-label="Next Speaker"
                      icon={<ArrowRightIcon />}
                      variant="ghost"
                      onClick={() => setActiveSpeaker(activeSpeaker + 1)}
                    />
                  </>
                )}
              </Flex>
            </Flex>
          )}
          {speakers.length === 1 && (
            <Flex justifyContent="center">
              <SpeakerCard key={speakers[0].id} speaker={speakers[0]} />
            </Flex>
          )}
        </Flex>
      )}
    </Section>
  );
};

export default UpcomingCarousel;
