import { Box } from "@chakra-ui/react";
import EditIcons from "./EditIcons";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { PageType } from "../../Pages/Page";

type Props = {
  id: number;
  order: number;
  numSections: number;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const ContentHeader = ({
  id,
  order,
  numSections,
  edit,
  setEdit,
  setPage,
}: Props) => {
  const { user } = useOutletContext() as Context;

  return (
    <>
      {!edit && user.role === "admin" && (
        <Box display="flex" justifySelf="flex-end">
          <EditIcons
            id={id}
            order={order}
            numSections={numSections}
            setPage={setPage}
            setEdit={setEdit}
          />
        </Box>
      )}
    </>
  );
};

export default ContentHeader;
