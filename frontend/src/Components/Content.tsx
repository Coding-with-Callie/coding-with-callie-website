import { useState } from "react";
import { PageType } from "../Pages/Page";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import SectionWrapper from "./SectionWrapper";
import { Box, useMediaQuery } from "@chakra-ui/react";
import EditIcons from "./Home/EditIcons";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import EditableTextWithImage from "./Home/EditableTextWithImage";

type Props = {
  type: string;
  data: any;
  id: number;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const Content = ({ data, id, numSections, setPage }: Props) => {
  const { user } = useOutletContext() as Context;
  const [edit, setEdit] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const getContent = () => {
    if (data.bodyText && data.imageUrl && data.linkUrl) {
      return (
        <EditableTextWithImageAndLink
          data={data}
          setPage={setPage}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      );
    } else if (data.imageUrl && data.bodyText) {
      return (
        <EditableTextWithImage
          data={data}
          setPage={setPage}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      );
    }
  };

  return (
    <SectionWrapper>
      <Box display="flex" flexDirection={isLargerThan800 ? "row" : "column"}>
        {getContent()}
        {!edit && user.role === "admin" && (
          <EditIcons
            id={id}
            order={data.order}
            numSections={numSections}
            setPage={setPage}
            setEdit={setEdit}
          />
        )}
      </Box>
    </SectionWrapper>
  );
};

export default Content;
