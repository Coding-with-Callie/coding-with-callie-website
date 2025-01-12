import {
  Box,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
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
import { PageType } from "../../Pages/Page";

type Props = {
  id: number;
  order: number;
  numSections: number;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditIcons = ({ id, order, numSections, setPage, setEdit }: Props) => {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const deleteSection = () => {
    axiosAdmin
      .delete(`/section/${id}`)
      .then((response) => {
        setPage(response.data);
        onCloseAlert();
        toast.success("Section deleted successfully!");
      })
      .catch(() => {
        toast.error("Error deleting section");
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
      .patch(`/section/${id}/order`, {
        direction,
      })
      .then((response) => {
        console.log(response.data);
        setPage(response.data);
      })
      .catch(() => {
        toast.error("Error moving section");
      });
  };

  return (
    <>
      <Box
        mt={isLargerThan800 ? 0 : 8}
        ml={isLargerThan800 ? 8 : 0}
        display="flex"
        gap={2}
        flexDirection="column"
      >
        <IconButton
          aria-label={"edit section"}
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
          aria-label={"delete section"}
          icon={<FaRegTrashAlt />}
          onClick={onOpenAlert}
          colorScheme="red"
        />
      </Box>
      <Alert
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        cancelRef={cancelRef}
        item="section"
        handleDelete={deleteSection}
      />
    </>
  );
};

export default EditIcons;
