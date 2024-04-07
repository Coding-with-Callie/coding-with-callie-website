import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import { Session, sessions } from "../Components/Resources/sessions";
import SessionTask from "../Components/Resources/SessionTask";
import Section from "../Components/Section";
import { Data } from "./Profile";
import BodyText from "../Components/BodyText";

const WorkshopResources = () => {
  const data = useLoaderData() as Data;
  const { id } = useParams();

  const workshop = data.workshops.find(
    (workshop) => workshop.id === parseInt(id!)
  );

  const context: Context = useOutletContext();

  const role = context.user.role;

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>{`${workshop?.name}`}</BodyHeading>
        <BodyText
          textBlocks={workshop?.details || []}
          textAlignCenter={false}
        ></BodyText>
        <OrderedList color="#45446A" my={4}>
          {workshop?.sessions.map((session: Session) => {
            return <ListItem>{session.title}</ListItem>;
          })}
        </OrderedList>
      </Section>
      <Box>
        {workshop?.sessions.map((session, index) => {
          const today = new Date();
          const startDate = new Date(session.startDate);

          if (today > startDate || role === "admin") {
            return (
              <SessionTask
                session={session}
                index={index}
                userId={context.user.id}
                submissions={data.submissions}
              />
            );
          } else {
            return null;
          }
        })}
      </Box>
    </>
  );
};

export default WorkshopResources;
