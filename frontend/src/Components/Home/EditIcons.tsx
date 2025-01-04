import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import {
  FaRegEdit,
  FaRegHandPointUp,
  FaRegHandPointDown,
  FaRegTrashAlt,
} from "react-icons/fa";
import Alert from "../Profile/Alert";
import { useRef } from "react";
import { toast } from "react-toastify";
import { axiosAdmin } from "../../helpers/axios_instances";

type Props = {
  id: number;
  order: number;
  numSections: number;
  setPageData: React.Dispatch<React.SetStateAction<any[]>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditIcons = ({ id, order, numSections, setPageData, setEdit }: Props) => {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteResource = () => {
    axiosAdmin
      .delete(`/resource/${id}`)
      .then((response) => {
        setPageData(response.data);
        onCloseAlert();
        toast.success("Resource deleted successfully from home page!");
      })
      .catch(() => {
        toast.error("Error deleting resource");
      });
  };

  const scrollToElement = (order: number) => {
    return new Promise((resolve) => {
      document.getElementById(order.toString())?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(resolve, 200);
    });
  };

  const moveResource = async (direction: string) => {
    order = direction === "up" ? order - 1 : order + 1;
    await scrollToElement(order);

    axiosAdmin
      .post(`/resource/${id}/order`, {
        direction,
      })
      .then((response) => {
        setPageData(response.data);
      })
      .catch(() => {
        toast.error("Error moving resource");
      });
  };

  return (
    <>
      <Box mb={6} display="flex" gap={2}>
        <IconButton
          aria-label={"edit resource"}
          icon={<FaRegEdit />}
          onClick={() => setEdit(true)}
        />
        <IconButton
          aria-label={"move resource up"}
          icon={<FaRegHandPointUp />}
          onClick={moveResource.bind(null, "up")}
          colorScheme="blue"
          disabled={order === 1}
        />
        <IconButton
          aria-label={"move resource down"}
          icon={<FaRegHandPointDown />}
          onClick={moveResource.bind(null, "down")}
          colorScheme="blue"
          disabled={order === numSections}
        />
        <IconButton
          aria-label={"delete resource"}
          icon={<FaRegTrashAlt />}
          onClick={onOpenAlert}
          colorScheme="red"
        />
      </Box>
      <Alert
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        cancelRef={cancelRef}
        item="resource"
        handleDelete={deleteResource}
      />
    </>
  );
};

export default EditIcons;
