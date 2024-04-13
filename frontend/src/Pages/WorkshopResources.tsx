import { Box, ListItem, OrderedList } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import SessionTask from "../Components/Resources/SessionTask";
import Section from "../Components/Section";
import { Submission } from "./Profile";
import BodyText from "../Components/BodyText";
import { Workshop } from "./Workshops";
import { Session } from "../Components/Resources/sessions";

type LoaderData = {
  workshop: Workshop;
  submissions: Submission[];
};

const WorkshopResources = () => {
  const { workshop, submissions } = useLoaderData() as LoaderData;

  const context: Context = useOutletContext();

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>{`${workshop?.name}`}</BodyHeading>
        <BodyText
          textBlocks={workshop?.details || []}
          textAlignCenter={false}
        ></BodyText>
        <OrderedList color="#45446A" my={4}>
          {workshop?.sessions.map((session: Session, index: number) => {
            return <ListItem key={index}>{session.title}</ListItem>;
          })}
        </OrderedList>
      </Section>
      <Box>
        {workshop?.sessions.map((session, index) => {
          return (
            <SessionTask
              workshopId={workshop.id}
              session={session}
              index={index}
              userId={context.user.id}
              submissions={submissions}
              key={index}
            />
          );
        })}
      </Box>
    </>
  );
};

export default WorkshopResources;
