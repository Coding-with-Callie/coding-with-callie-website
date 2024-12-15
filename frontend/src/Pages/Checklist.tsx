import { useLoaderData } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import ChecklistContainer from "../Components/Checklists/ChecklistContainer";
import { useEffect, useState } from "react";

const Checklist = () => {
  const data = useLoaderData() as ChecklistType;
  const [checklist, setChecklist] = useState(data);

  useEffect(() => {
    setChecklist(data); // Update state when loader data changes
  }, [data]);

  return (
    <ChecklistContainer
      checklist={checklist}
      children={checklist.children}
      key={checklist.id}
      setChecklist={setChecklist}
      checklistId={checklist.id}
    />
  );
};

export default Checklist;
