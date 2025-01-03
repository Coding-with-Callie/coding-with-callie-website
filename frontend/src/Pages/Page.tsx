import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import Resources from "../Components/Home/Resources";

type Props = {
  data: any[];
};

const Page = ({ data }: Props) => {
  const { user } = useOutletContext() as Context;

  return (
    <>
      {data.map((section) => {
        if (section.type === "resource") {
          return <Resources data={[section.data]} role={user.role} />;
        }
        return <div>hello</div>;
      })}
    </>
  );
};

export default Page;
