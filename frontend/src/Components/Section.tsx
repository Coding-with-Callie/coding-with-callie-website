import { Box, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import Resource from "./Home/Resource";
import SectionHeading from "./Home/SectionHeading";

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
      <SectionHeading
        heading={data.data.heading}
        id={data.id}
        order={0}
        numSections={numSections}
        edit={edit}
        setEdit={setEdit}
        setPageData={setPageData}
      />
      {data.type === "resource" && (
        <Resource
          resource={data.data}
          setPageData={setPageData}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </Box>
  );
};

export default Section;
