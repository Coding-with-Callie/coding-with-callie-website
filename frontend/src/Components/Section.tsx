import { useState } from "react";
import SectionHeading from "./Home/SectionHeading";
import SectionWrapper from "./SectionWrapper";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import { PageType, TextWithImageAndLinkType } from "../Pages/Page";

type Props = {
  id: number;
  type: string;
  data: TextWithImageAndLinkType;
  backgroundColor?: string;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const Section = ({ id, data, numSections, setPage, type }: Props) => {
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
        setPage={setPage}
      />
      {type === "text with image and link" && setPage && (
        <EditableTextWithImageAndLink
          data={data}
          setPage={setPage}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      )}
    </SectionWrapper>
  );
};

export default Section;
