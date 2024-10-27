import { 
    Button, 
    Card, 
    CardBody, 
    CardHeader, 
    Image, 
    Flex, 
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Center
} from "@chakra-ui/react";
import { Speaker } from "../../Pages/GuestSpeakers";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import BodyText from "../BodyText";
import { useState } from "react";

interface Props {
    speaker: Speaker;
}

const SpeakerCard = ({speaker} : Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const zoomLink = 'https://us06web.zoom.us/j/83354214189?' +
        'pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1';
    const date = new Date(speaker.date);
    /*We need to format the date and time correctly in order to create a
    calendar event.*/
    const formattedDate = date.getFullYear() + 
        `${(date.getMonth() + 1)}`.padStart(2, '0') +
        `${(date.getDate())}`.padStart(2, '0')
    const timeList = speaker.time.split(" ");
    const amPm = timeList[0].slice(-2);
    const time = timeList[0].slice(0, -2);
    let hours = parseInt(time.split(":")[0]);
    let minutes = time.split(":")[1];
    if (!minutes) {
        minutes = "00";
    }
    if (amPm === 'PM') {
        hours += 12;
    }
    const startTime = `${hours}`.padStart(2, '0') + `${minutes}00`;
    const endTime = `${hours + 1}`.padStart(2, '0') + `${minutes}00`;
    //Create the details that will be displayed on the calendar event
    let sessionDetails = "";
    for (let text of speaker.sessionText) {
        sessionDetails += text + "%0A";
    }
    sessionDetails += `%0A<a href=${zoomLink}>Join Zoom</a>`;
    const calendarLink = 
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=` +
        `Coding+With+Callie+Meet-up+${speaker.name.replaceAll(" ", "+")}&` + 
        `details=${sessionDetails.replaceAll(" ", "+")}&` +
        `dates=${formattedDate}T${startTime}/${formattedDate}T${endTime}&` +
        `ctz=America/New_York`
    return (
        <Card 
            w='100%'
            backgroundColor = {isHovered ? "#f3fbff" : "white"}
            boxShadow={isHovered ? "2xl" : "sm"} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            minWidth='280px'
        >
            <CardHeader>
                <BodyHeading textAlignCenter={true}>
                    {speaker.name}
                </BodyHeading>
                <Flex justifyContent="center">
                    <Image
                        src={speaker.photoUrl}
                        borderRadius="50%"
                        h={"250px"}
                        boxShadow="lg"
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex h='100%' flexDirection='column' justifyContent='flex-end'>
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
                                        Meet-up Date
                                    </Box>
                                    <AccordionIcon color={"#45446A"} />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Paragraph>
                                    {`${speaker.date} ${speaker.time}`}
                                </Paragraph>
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
                                        Session Description
                                    </Box>
                                    <AccordionIcon color={"#45446A"} />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <BodyText
                                    textBlocks={speaker.sessionText}
                                    textAlignCenter={false}
                                />
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
                                        About {speaker.name.split(" ")[0]}
                                    </Box>
                                    <AccordionIcon color={"#45446A"} />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <BodyText 
                                    textBlocks={speaker.bioText} 
                                    textAlignCenter={false} 
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Center mt={4}>
                        <Button
                            colorScheme="green"
                            onClick={() => window.open(calendarLink, "_blank")}
                        >
                            Add to Calendar
                        </Button>
                    </Center>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default SpeakerCard;