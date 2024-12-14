import { useLoaderData } from "react-router-dom";
import ChecklistWithChildren, {
  ChecklistWithChildrenType,
} from "../Components/Checklists/ChecklistWithChildren";

const Checklists = () => {
  const data = useLoaderData() as ChecklistWithChildrenType[];

  console.log("top level data", data);

  return (
    <>
      {data.map((checklist) => {
        if (checklist.children.length === 0) {
          return null;
        }
        return (
          <ChecklistWithChildren
            task={checklist}
            children={checklist.children}
          />
        );
      })}
    </>
  );
};

export default Checklists;
