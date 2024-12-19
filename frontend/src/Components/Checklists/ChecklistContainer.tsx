import { Box, Editable, Text } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import ProgressColumn from "./ProgressColumn";
import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { taskFormData } from "../../helpers/forms";
import EditableText from "../Profile/EditableText";
import CreateChecklistForm from "./CreateChecklistForm";

export type ChecklistType = {
  id: number;
  name: string;
  description?: string;
  children: ChecklistType[];
  parentList: null | ChecklistType;
  status: "To Do" | "In Progress" | "Done";
  breadcrumbs: { id: number; name: string }[];
};

type Props = {
  checklist: ChecklistType;
  children: ChecklistType[];
  setChecklist: (checklist: ChecklistType) => void;
  checklistId: number;
  parentId: null | number;
};

const ChecklistContainer = ({
  checklist,
  children,
  setChecklist,
  checklistId,
  parentId,
}: Props) => {
  const toDoChildren = children.filter((child) => child.status === "To Do");
  const inProgressChildren = children.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = children.filter((child) => child.status === "Done");

  return (
    <Section>
      {/* <EditableText
        field="name"
        value={checklist.name}
        route={`/checklists/${checklistId}`}
        method="patch"
        updateData={setChecklist}
        isHeading={true}
        showLabel={false}
        initialState={{
          ...initialState,
          name: checklist.name,
          description: checklist.description,
        }}
      /> */}
      <Text mb={6}>{checklist.description}</Text>
      {children.length > 0 && (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={4}
          >
            <ProgressColumn
              children={toDoChildren}
              columnName="To Do"
              setChecklist={setChecklist}
              checklistId={checklistId}
            />
            <ProgressColumn
              children={inProgressChildren}
              columnName="In Progress"
              setChecklist={setChecklist}
              checklistId={checklistId}
            />
            <ProgressColumn
              children={doneChildren}
              columnName="Done"
              setChecklist={setChecklist}
              checklistId={checklistId}
            />
          </Box>
        </>
      )}
      <CreateChecklistForm setChecklist={setChecklist} parentId={checklistId} />
    </Section>
  );
};

export default ChecklistContainer;
