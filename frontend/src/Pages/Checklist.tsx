import { Link, useLoaderData } from "react-router-dom";
import { ChecklistType } from "../Components/Checklists/ChecklistContainer";
import ChecklistContainer from "../Components/Checklists/ChecklistContainer";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Section from "../Components/Section";

const Checklist = () => {
  const data = useLoaderData() as ChecklistType;
  const [checklist, setChecklist] = useState(data);

  useEffect(() => {
    setChecklist(data); // Update state when loader data changes
  }, [data]);

  return (
    <>
      <Section>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/checklists">
              Checklists
            </BreadcrumbLink>
          </BreadcrumbItem>
          {checklist.breadcrumbs.map((breadcrumb) => {
            return (
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  to={`/checklist/${breadcrumb.id}`}
                  isCurrentPage={checklist.id === breadcrumb.id}
                >
                  {breadcrumb.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </Section>
      <ChecklistContainer
        checklist={checklist}
        children={checklist.children}
        key={checklist.id}
        setChecklist={setChecklist}
        checklistId={checklist.id}
        parentId={checklist?.parentList?.id || null}
      />
    </>
  );
};

export default Checklist;
