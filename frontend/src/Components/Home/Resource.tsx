import { Box } from "@chakra-ui/react";
import TextWithImageAndButton from "./TextWithImageAndButton";
import { ResourceType } from "../../Pages/Home";
import { useState } from "react";
import EditableResource from "./EditableResource";

type Props = {
  resource: ResourceType;
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
  numResources: number;
};

const Resource = ({ resource, setResources, numResources }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <Box id={resource.order.toString()}>
      {edit ? (
        <EditableResource
          id={resource.id}
          resource={resource}
          setResources={setResources}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImageAndButton
          resource={resource}
          setResources={setResources}
          setEdit={setEdit}
          numResources={numResources}
        />
      )}
    </Box>
  );
};

export default Resource;
