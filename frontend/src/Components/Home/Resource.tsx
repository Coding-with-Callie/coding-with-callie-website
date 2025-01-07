import { Box } from "@chakra-ui/react";
import TextWithImageAndButton from "./TextWithImageAndButton";
import EditableTextWithImageAndButton from "./EditableTextWithImageAndButton";
import { ResourceType } from "../../Pages/Page";

type Props = {
  resource: ResourceType;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const Resource = ({ resource, setPageData, edit, setEdit, id }: Props) => {
  return (
    <Box>
      {edit ? (
        <EditableTextWithImageAndButton
          id={id}
          initialState={resource}
          setPageData={setPageData}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImageAndButton data={resource} />
      )}
    </Box>
  );
};

export default Resource;
