import Section from "../Components/Section";
import MyButton from "../Components/MyButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import BodyHeading from "../Components/BodyHeading";
import { Text } from "@chakra-ui/react";
import CreateChecklistForm from "../Components/Checklists/CreateChecklistForm";
import { useState } from "react";

const Checklists = () => {
  const data = useLoaderData() as ChecklistType[];
  const [checklists, setChecklists] = useState(data);

  const navigate = useNavigate();

  return (
    <>
      {checklists.map((checklist) => {
        const openChecklist = () => {
          navigate(`/checklist/${checklist.id}`);
        };

        return (
          <Section>
            <BodyHeading>{checklist.name}</BodyHeading>
            <Text mb={6}>{checklist.description}</Text>
            <MyButton onClick={openChecklist}>View Checklist!</MyButton>
          </Section>
        );
      })}

      <Section>
        <CreateChecklistForm setChecklist={setChecklists} parentId={null} />
      </Section>
    </>
  );
};

export default Checklists;
