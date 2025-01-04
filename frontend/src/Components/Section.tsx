import { Box, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "./BodyHeading";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import TextWithImageAndButton from "./Home/TextWithImageAndButton";
import EditIcons from "./Home/EditIcons";
import { useState } from "react";
import EditableTextWithImageAndButton from "./Home/EditableTextWithImageAndButton";

type Props = {
  data: any;
  backgroundColor?: string;
  numSections: number;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
};

const Section = ({
  backgroundColor = "white",
  data,
  numSections,
  setPageData,
}: Props) => {
  const { user } = useOutletContext() as Context;

  const [edit, setEdit] = useState(false);

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box
      mt={20}
      mb={4}
      p={8}
      maxW={isLargerThan900 ? "85%" : "100%"}
      backgroundColor={backgroundColor}
      borderRadius={5}
      mx={isLargerThan900 ? "auto" : 8}
      boxShadow="lg"
    >
      {!edit && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={isLargerThan800 ? "row" : "column"}
        >
          <BodyHeading>{data.data.heading}</BodyHeading>
          {user.role === "admin" && (
            <EditIcons
              id={data.id}
              order={data.data.order}
              numSections={numSections}
              setPageData={setPageData}
              setEdit={setEdit}
            />
          )}
        </Box>
      )}
      {data.type === "resource" && edit ? (
        <EditableTextWithImageAndButton
          id={data.id}
          resource={data.data}
          setResources={setPageData}
          setEdit={setEdit}
        />
      ) : (
        <TextWithImageAndButton data={data.data} />
      )}
    </Box>
  );
};

export default Section;
