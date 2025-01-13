import WorkshopTile from "./WorkshopTile";

type Props = {
  workshops: any[];
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
