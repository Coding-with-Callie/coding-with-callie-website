import { Box } from "@chakra-ui/react";
import TextWithImageAndButton from "./TextWithImageAndButton";
import EditableTextWithImageAndButton from "./EditableTextWithImageAndButton";

export type ResourceData = {
  id: number;
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  bodyText: string[];
  target: boolean;
  order: number;
};

type Props = {
  resource: ResourceData;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const Resource = ({ resource, setPageData, edit, setEdit }: Props) => {
  return (
    <Box>
      {edit ? (
        <EditableTextWithImageAndButton
          id={resource.id}
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
