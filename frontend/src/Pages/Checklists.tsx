import { useLoaderData } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import ChecklistContainer from "../Components/Checklists/ChecklistContainer";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const Checklists = () => {
  const data = useLoaderData() as ChecklistType[];
  const isTopLevel = data.every((checklist) => checklist.parentList === null);

  return (
    <>
      {data.map((checklist) => {
        return (
          <ChecklistContainer task={checklist} children={checklist.children} />
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
