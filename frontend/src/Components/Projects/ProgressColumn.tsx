import { Box } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import FeatureBox from "./FeatureBox";

type Props = {
  features: { name: string; id: number }[];
  columnName: string;
  projectId: number;
};

const ProgressColumn = ({ features, columnName, projectId }: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      <BodyHeading fontSize={20}>{columnName}</BodyHeading>
      {features.map((feature) => {
        return (
          <FeatureBox
            name={feature.name}
            projectId={projectId}
            featureId={feature.id}
          />
        );
      })}
    </Box>
  );
};

export default ProgressColumn;
