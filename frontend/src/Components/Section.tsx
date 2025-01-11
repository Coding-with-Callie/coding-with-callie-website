import SectionWrapper from "./SectionWrapper";
import { ContentType, PageType } from "../Pages/Page";
import Content from "./Content";

type Props = {
  id: number;
  type: string;
  data: ContentType;
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
