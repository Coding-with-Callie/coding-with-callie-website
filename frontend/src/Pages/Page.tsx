import { useEffect, useState } from "react";
import Section from "../Components/Section";
import MyButton from "../Components/MyButton";
import SectionWrapper from "../Components/SectionWrapper";

export type TextWithImageAndLinkType = {
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
  data: TextWithImageAndLinkType;
};

export type PageType = {
  id: number;
  path: string;
  sections: SectionType[];
};

type Props = {
  data: PageType;
};

const Page = ({ data }: Props) => {
  const [page, setPage] = useState(data);

  useEffect(() => {
    setPage(data);
  }, [data]);

  return (
    <>
      {page.sections.map((section) => (
        <Section
          data={section.data}
          numSections={page.sections.length}
          setPage={setPage}
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
