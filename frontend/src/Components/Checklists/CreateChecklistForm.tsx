import { Box } from "@chakra-ui/react";
import { checklistFormData, taskFormData } from "../../helpers/forms";
import FormInputs from "../Forms/FormInputs";
import FormSubmitButton from "../Forms/FormSubmitButton";
import MyButton from "../MyButton";
import { useState } from "react";

type Props = {
  setChecklist: (checklist: any) => void;
  parentId: null | number;
};

const CreateChecklistForm = ({ setChecklist, parentId }: Props) => {
  const [addChecklist, setAddChecklist] = useState(false);
  const initialState = {
    name: "",
    description: "",
    parentId: parentId,
  };
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  return (
    <Box mt={8} display="flex" gap={4} flexDirection="column">
      {addChecklist ? (
        <>
          <FormInputs
            input={parentId ? taskFormData.input : checklistFormData.input}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
          <FormSubmitButton
            data={data}
            setData={setData}
            initialState={initialState}
            setSubmitClicked={setSubmitClicked}
            input={parentId ? taskFormData.input : checklistFormData.input}
            axiosType={"private"}
            route={"/checklists"}
            method={"post"}
            message={parentId ? "Task added!" : "Checklist added!"}
            setEdit={setAddChecklist}
            updateData={setChecklist}
          />
        </>
      ) : (
        <MyButton variant="outline" onClick={() => setAddChecklist(true)}>
          Add a {parentId ? "task" : "checklist"}
        </MyButton>
      )}
    </Box>
  );
};

export default CreateChecklistForm;
