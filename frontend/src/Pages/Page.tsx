import { useState } from "react";
import Section from "../Components/Section";

type Props = {
  data: any[];
};

const Page = ({ data }: Props) => {
  const [pageData, setPageData] = useState(data);

  return (
    <>
      {data.map((section) => (
        <Section
          data={section}
          numSections={pageData.length}
          setPageData={setPageData}
        />
      ))}
    </>
  );
};

export default Page;
