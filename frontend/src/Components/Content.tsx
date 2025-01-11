import { useState } from "react";
import { PageType } from "../Pages/Page";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import PhotoAndText from "./Home/PhotoAndText";
import SectionWrapper from "./SectionWrapper";
import { Box, useMediaQuery } from "@chakra-ui/react";
import EditIcons from "./Home/EditIcons";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";

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
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

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
        <PhotoAndText
          heading={data.heading}
          text={data.bodyText}
          image={data.imageUrl}
        />
      );
    }
  };

  return (
    <SectionWrapper>
      <Box display="flex">
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
