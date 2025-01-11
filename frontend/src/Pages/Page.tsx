import { useEffect, useState } from "react";
import Section from "../Components/Section";
import MyButton from "../Components/MyButton";
import SectionWrapper from "../Components/SectionWrapper";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";

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
  const { user } = useOutletContext() as Context;

  console.log("user", user);

  useEffect(() => {
    setPage(data);
  }, [data]);

  return (
    <>
      {data.sections.map((section) => (
        <Section
          data={section.data}
          numSections={page.sections.length}
          setPage={setPage}
          key={section.id}
          id={section.id}
          type={section.type}
        />
      ))}
      {user.role && user.role === "admin" && (
        <SectionWrapper>
          <MyButton>Add a section!</MyButton>
        </SectionWrapper>
      )}
    </>
  );
};

export default Page;
