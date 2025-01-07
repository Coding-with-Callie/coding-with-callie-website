import { useState } from "react";
import SectionHeading from "./Home/SectionHeading";
import SectionWrapper from "./SectionWrapper";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import { TextWithImageAndLinkType } from "../Pages/Page";

type Props = {
  id: number;
  type: string;
  data: TextWithImageAndLinkType;
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
      {type === "text with image and link" && setPageData && (
        <EditableTextWithImageAndLink
          data={data}
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
