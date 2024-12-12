import { Workshop } from "../../Pages/Workshops";
import WorkshopTile from "./WorkshopTile";

type Props = {
  workshops: Workshop[];
};

const WorkshopTiles = ({ workshops }: Props) => {
  return (
    <>
      {workshops.map((workshop, index) => {
        return <WorkshopTile workshop={workshop} index={index} />;
      })}
    </>
  );
};

export default WorkshopTiles;
