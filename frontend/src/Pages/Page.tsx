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
          data={section}
          numSections={pageData.length}
          setPageData={setPageData}
          key={section.id}
        />
      ))}
    </>
  );
};

export default Page;
