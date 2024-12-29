import { Box } from "@chakra-ui/react";
import { ResourceType } from "../../Pages/Home";
import Resource from "./Resource";
import { useState } from "react";
import ResourceForm from "./CreateResourceForm";

type Props = {
  data: ResourceType[];
  role: string;
};

const Resources = ({ data, role }: Props) => {
  const [resources, setResources] = useState<ResourceType[]>(data);

  return (
    <>
      {resources.map((resource) => (
        <Resource
          resource={resource}
          setResources={setResources}
          numResources={resources.length}
        />
      ))}
      {role === "admin" && (
        <Box mt={20}>
          <ResourceForm setResources={setResources} />
        </Box>
      )}
    </>
  );
};

export default Resources;
