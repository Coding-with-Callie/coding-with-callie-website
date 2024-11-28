import { Workshop } from "../../Pages/Workshops";
import WorkshopTile from "./WorkshopTile";
import Paragraph from "../Paragraph";
import WorkshopTilesContainer from "./WorkshopTilesContainer";

type Props = {
  workshops: Workshop[];
};

const WorkshopTiles = ({ workshops }: Props) => {
  return (
    <>
      {workshops.length > 0 ? (
        <WorkshopTilesContainer>
          {workshops.map((workshop, index) => {
            return <WorkshopTile workshop={workshop} index={index} />;
          })}
        </WorkshopTilesContainer>
      ) : (
        <Paragraph>There are no workshops yet...</Paragraph>
      )}
    </>
  );
};

export default WorkshopTiles;
