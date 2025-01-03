import { useOutletContext } from "react-router-dom";
import Resources from "../Components/Home/Resources";
import { ResourceType } from "./Home";
import { Context } from "../App";

type Props = {
  resources: ResourceType[];
};

const Page = ({ resources }: Props) => {
  const { user } = useOutletContext() as Context;

  return <Resources data={resources} role={user.role} />;
};

export default Page;
