import SectionWrapper from "./SectionWrapper";
import {
  LogInFormType,
  PageType,
  TextWithImageAndLinkType,
} from "../Pages/Page";
import Content from "./Content";

type Props = {
  id: number;
  type: string;
  data: TextWithImageAndLinkType | LogInFormType;
  backgroundColor?: string;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

const Section = ({ id, data, numSections, setPage, type }: Props) => {
  return (
    <SectionWrapper>
      {type === "content" && (
        <Content
          type={type}
          data={data}
          id={id}
          numSections={numSections}
          setPage={setPage}
        />
      )}
    </SectionWrapper>
  );
};

export default Section;
