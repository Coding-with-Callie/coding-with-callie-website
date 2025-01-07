import { useState } from "react";
import Section from "../Components/Section";
import MyButton from "../Components/MyButton";
import SectionWrapper from "../Components/SectionWrapper";

export type ResourceType = {
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  bodyText: string[];
  target: boolean;
};

export type SectionType = {
  id: number;
  type: string;
  data: ResourceType;
};

type Props = {
  sections: SectionType[];
};

const Page = ({ sections }: Props) => {
  const [pageData, setPageData] = useState(sections);

  return (
    <>
      {pageData.map((section) => (
        <Section
          data={section.data}
          numSections={pageData.length}
          setPageData={setPageData}
          key={section.id}
          id={section.id}
          type={section.type}
        />
      ))}
      <SectionWrapper>
        <MyButton>Add a section!</MyButton>
      </SectionWrapper>
    </>
  );
};

export default Page;
