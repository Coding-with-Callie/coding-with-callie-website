import { useState } from "react";
import Section from "../Components/Section";

type Props = {
  data: any[];
};

const Page = ({ data }: Props) => {
  const [pageData, setPageData] = useState(data);

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
          heading={section.data.heading || null}
        />
      ))}
      <Section id={1} type="button" data={"Add a section!"} />
    </>
  );
};

export default Page;
