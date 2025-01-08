import { Box, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import EditIcons from "./EditIcons";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { PageType } from "../../Pages/Page";

type Props = {
  heading: string;
  id: number;
  order: number;
  numSections: number;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const SectionHeading = ({
  heading,
  id,
  order,
  numSections,
  edit,
  setEdit,
  setPage,
}: Props) => {
  const { user } = useOutletContext() as Context;
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <>
      {!edit && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={isLargerThan800 ? "row" : "column"}
        >
          <BodyHeading>{heading}</BodyHeading>
          {user.role === "admin" && (
            <EditIcons
              id={id}
              order={order}
              numSections={numSections}
              setPage={setPage}
              setEdit={setEdit}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default SectionHeading;
