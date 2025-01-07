import { useState } from "react";
import Resource from "./Home/Resource";
import SectionHeading from "./Home/SectionHeading";
import { ResourceType } from "../Pages/Page";
import SectionWrapper from "./SectionWrapper";

type Props = {
  id: number;
  type: string;
  data: ResourceType;
  backgroundColor?: string;
  numSections: number;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
};

const Section = ({ id, data, numSections, setPageData, type }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <SectionWrapper>
      <SectionHeading
        heading={data.heading}
        id={id}
        order={0}
        numSections={numSections}
        edit={edit}
        setEdit={setEdit}
        setPageData={setPageData}
      />
      {type === "resource" && setPageData && (
        <Resource
          resource={data}
          setPageData={setPageData}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      )}
    </SectionWrapper>
  );
};

export default Section;
