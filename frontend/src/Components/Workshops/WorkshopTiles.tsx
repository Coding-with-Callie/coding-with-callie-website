import { Box } from "@chakra-ui/react";
import { Workshop } from "../../Pages/Workshops";
import WorkshopTile from "./WorkshopTile";
import Paragraph from "../Paragraph";

type Props = {
  workshops: Workshop[];
};

const WorkshopTiles = ({ workshops }: Props) => {
  return (
    <>
      {workshops.length > 0 ? (
        <Box
          display="flex"
          gap={20}
          flexWrap="wrap"
          justifyContent="center"
          w="100%"
        >
          {workshops.map((workshop, index) => {
            return <WorkshopTile workshop={workshop} index={index} />;
          })}
        </Box>
      ) : (
        <Paragraph>There are no workshops yet...</Paragraph>
      )}
    </>
  );
};

export default WorkshopTiles;
