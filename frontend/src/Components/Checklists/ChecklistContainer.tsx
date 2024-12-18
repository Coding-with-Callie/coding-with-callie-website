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

export type ChecklistType = {
  id: number;
  name: string;
  description?: string;
  children: ChecklistType[];
  parentList: null | number;
  status: "To Do" | "In Progress" | "Done";
  breadcrumbs: { id: number; name: string }[];
};

type Props = {
  checklist: ChecklistType;
  children: ChecklistType[];
  setChecklist: (checklist: ChecklistType) => void;
  checklistId: number;
};

const ChecklistContainer = ({
  checklist,
  children,
  setChecklist,
  checklistId,
}: Props) => {
  const toDoChildren = children.filter((child) => child.status === "To Do");
  const inProgressChildren = children.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = children.filter((child) => child.status === "Done");

  const [addTask, setAddTask] = useState(false);
  const initialState = {
    checklistId: checklistId,
    name: "",
    description: "",
    parentId: checklistId,
  };
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  return (
    <Section>
      <EditableText
        field="name"
        value={checklist.name}
        route={`/checklists/${checklistId}`}
        method="patch"
        updateData={setChecklist}
        isHeading={true}
        showLabel={false}
      />
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
      <Box mt={8} display="flex" gap={4} flexDirection="column">
        {addTask ? (
          <>
            <FormInputs
              input={taskFormData.input}
              data={data}
              setData={setData}
              submitClicked={submitClicked}
            />
            <FormSubmitButton
              data={data}
              setData={setData}
              initialState={initialState}
              setSubmitClicked={setSubmitClicked}
              input={taskFormData.input}
              axiosType={"private"}
              route={"/checklists"}
              message={"Task added!"}
              setEdit={setAddTask}
              updateData={setChecklist}
            />
          </>
        ) : (
          <MyButton variant="outline" onClick={() => setAddTask(true)}>
            Add a task
          </MyButton>
        )}
      </Box>
    </Section>
  );
};

export default ChecklistContainer;
