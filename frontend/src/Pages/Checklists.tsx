import Section from "../Components/Section";
import MyButton from "../Components/MyButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import BodyHeading from "../Components/BodyHeading";
import { Text } from "@chakra-ui/react";

const Checklists = () => {
  const data = useLoaderData() as ChecklistType[];
  const navigate = useNavigate();

  return (
    <>
      {data.map((checklist) => {
        const openChecklist = () => {
          navigate(`/checklist/${checklist.id}`);
        };

        return (
          <Section>
            <BodyHeading>{checklist.name}</BodyHeading>
            <Text>{checklist.description}</Text>
            <MyButton onClick={openChecklist}>View Checklist!</MyButton>
          </Section>
        );
      })}

      <Section>
        <MyButton variant="outline">Add a checklist</MyButton>
      </Section>
    </>
  );
};

export default Checklists;
