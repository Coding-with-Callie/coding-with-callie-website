import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { text } from "./theme";
import { ChecklistType } from "./Checklists/ChecklistContainer";

type Props = {
  checklist: ChecklistType;
};

const Breadcrumbs = ({ checklist }: Props) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/checklists" color={text}>
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
              color={text}
            >
              {breadcrumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
