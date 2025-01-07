import { Box, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import Resource from "./Home/Resource";
import SectionHeading from "./Home/SectionHeading";
import MyButton from "./MyButton";

type Props = {
  id: number;
  type: string;
  heading?: string;
  data: any;
  backgroundColor?: string;
  numSections?: number;
  setPageData?: React.Dispatch<React.SetStateAction<any[]>>;
};

const Section = ({
  id,
  backgroundColor = "white",
  data,
  numSections,
  setPageData,
  heading,
  type,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

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
      {heading && numSections && setPageData && (
        <SectionHeading
          heading={heading}
          id={id}
          order={0}
          numSections={numSections}
          edit={edit}
          setEdit={setEdit}
          setPageData={setPageData}
        />
      )}
      {type === "resource" && setPageData && (
        <Resource
          resource={data}
          setPageData={setPageData}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      )}
      {type === "button" && <MyButton>{data}</MyButton>}
    </Box>
  );
};

export default Section;
