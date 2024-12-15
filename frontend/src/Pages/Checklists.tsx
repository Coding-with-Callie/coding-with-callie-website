import { useLoaderData } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import ChecklistContainer from "../Components/Checklists/ChecklistContainer";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { useState } from "react";

const Checklists = () => {
  const data = useLoaderData() as ChecklistType[];
  const isTopLevel = data.every((checklist) => checklist.parentList === null);

  const [checklists, setChecklists] = useState<ChecklistType[]>(data);

  return (
    <>
      {checklists.map((checklist) => {
        return (
          <ChecklistContainer
            task={checklist}
            children={checklist.children}
            setChecklists={setChecklists}
          />
        );
      })}
      {isTopLevel && (
        <Section>
          <MyButton variant="outline">Add a checklist</MyButton>
        </Section>
      )}
    </>
  );
};

export default Checklists;
