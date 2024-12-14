import { useLoaderData } from "react-router-dom";
import ChecklistWithChildren from "../Components/Checklists/ChecklistWithChildren";

const Checklist = () => {
  const data = useLoaderData() as any;

  return <ChecklistWithChildren task={data} children={data.children} />;
};

export default Checklist;
