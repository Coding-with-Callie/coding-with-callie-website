import { useState } from "react";
import SectionHeading from "./Home/SectionHeading";
import SectionWrapper from "./SectionWrapper";
import EditableTextWithImageAndLink from "./Home/EditableTextWithImageAndLink";
import {
  LogInFormType,
  PageType,
  TextWithImageAndLinkType,
} from "../Pages/Page";
import LogInForm from "./LogIn/LogInForm";

type Props = {
  id: number;
  type: string;
  data: TextWithImageAndLinkType | LogInFormType;
  backgroundColor?: string;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const Section = ({ id, data, numSections, setPage, type }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <SectionWrapper>
      <SectionHeading
        type={type}
        heading={data.heading}
        id={id}
        order={0}
        numSections={numSections}
        edit={edit}
        setEdit={setEdit}
        setPage={setPage}
      />
      {type === "text with image and link" && "imageUrl" in data && setPage && (
        <EditableTextWithImageAndLink
          data={data}
          setPage={setPage}
          edit={edit}
          setEdit={setEdit}
          id={id}
        />
      )}
      {type === "log-in form" && <LogInForm />}
    </SectionWrapper>
  );
};

export default Section;
