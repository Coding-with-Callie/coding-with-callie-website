import { Box, IconButton } from "@chakra-ui/react";
import Section from "../Section";
import ProgressColumn from "./ProgressColumn";
import CreateChecklistForm from "./CreateChecklistForm";
import EditableText from "../Profile/EditableText";
import { FaRegTrashAlt } from "react-icons/fa";
import { axiosPrivate } from "../../helpers/axios_instances";
import { useNavigate } from "react-router-dom";

export type ChecklistType = {
  id: number;
  name: string;
  description?: string;
  children: ChecklistType[];
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
  const navigate = useNavigate();

  const toDoChildren = children.filter((child) => child.status === "To Do");
  const inProgressChildren = children.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = children.filter((child) => child.status === "Done");

  const initialStateName = {
    name: checklist.name,
  };

  const initialStateDescription = {
    description: checklist.description,
  };

  const deleteChecklist = async () => {
    axiosPrivate.delete(`/checklists/${checklistId}`).then((response) => {
      navigate(`/checklist/${response.data}`);
    });
  };

  return (
    <Section>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Box w="100%">
          <EditableText
            field="name"
            value={checklist.name}
            route={`/checklists/${checklistId}`}
            method="patch"
            updateData={setChecklist}
            isHeading={true}
            showLabel={false}
            initialState={initialStateName}
            message="Checklist updated!"
          />
        </Box>
        <IconButton
          aria-label={"delete checklist"}
          icon={<FaRegTrashAlt />}
          onClick={deleteChecklist}
        />
      </Box>
      <EditableText
        inputType="textarea"
        field="description"
        value={checklist.description || "Add a more detailed description..."}
        route={`/checklists/${checklistId}`}
        method="patch"
        updateData={setChecklist}
        isHeading={false}
        showLabel={false}
        initialState={initialStateDescription}
        message="Checklist updated!"
      />
      {children.length > 0 && (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={4}
            mt={4}
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
