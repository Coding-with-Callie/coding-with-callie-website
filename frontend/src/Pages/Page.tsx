import { useEffect, useState } from "react";
import MyButton from "../Components/MyButton";
import SectionWrapper from "../Components/SectionWrapper";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import Content from "../Components/Content";

export type TextWithImageAndLinkType = {
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  bodyText: string[];
  target: boolean;
};

export type ContentType = {
  heading: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  bodyText: string[];
  target?: boolean;
};

export type SectionType = {
  id: number;
  type: "content";
  data: ContentType;
};

export type PageType = {
  id?: number;
  path: string;
  page: string;
  sections: SectionType[];
};

type Props = {
  data: PageType;
};

const Page = ({ data }: Props) => {
  const [page, setPage] = useState(data);
  const { user } = useOutletContext() as Context;

  useEffect(() => {
    setPage(data);
  }, [data]);

  return (
    <>
      {page.sections.map((section) => {
        if (section.type === "content") {
          return (
            <Content
              data={section.data}
              id={section.id}
              numSections={data.sections.length}
              setPage={setPage}
            />
          );
        }
        return null;
      })}
      {user.role === "admin" && (
        <SectionWrapper>
          <MyButton>Add a section!</MyButton>
        </SectionWrapper>
      )}
    </>
  );
};

export default Page;
