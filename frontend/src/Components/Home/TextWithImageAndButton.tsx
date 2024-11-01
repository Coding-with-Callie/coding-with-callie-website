import {
  Box,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import ImageWithBorder from "./ImageWithBorder";
import { Link } from "react-router-dom";
import MyButton from "../MyButton";
import Alert from "../Profile/Alert";
import { useRef } from "react";
import axios from "axios";
import { host } from "../..";
import { ResourceType } from "../../Pages/Home";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  target: "_blank" | "_self";
  editable: boolean;
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
  id: number;
};

const TextWithImageAndButton = ({
  children,
  heading,
  imageUrl,
  linkUrl,
  buttonText,
  target,
  editable,
  setResources,
  id,
}: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteResource = () => {
    axios
      .delete(`${host}/api/auth/resource/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setResources(response.data);
        onCloseAlert();
        toast.success("Resource deleted successfully from home page!");
      })
      .catch(() => {
        toast.error("Error deleting resource");
      });
  };

  return (
    <>
      <Box w="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <BodyHeading textAlignCenter={false}>{heading}</BodyHeading>
          {editable && (
            <Box mb={6}>
              <IconButton
                aria-label={"delete resource"}
                icon={<FaRegTrashAlt />}
                onClick={onOpenAlert}
                colorScheme="red"
              />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection={isLargerThan900 ? "row" : "column"}
          gap={10}
          mb={10}
          alignItems="center"
        >
          {children}
          <ImageWithBorder imageUrl={imageUrl} />
        </Box>
        <Link to={linkUrl} target={target === "_blank" ? "_blank" : "_self"}>
          <MyButton widthSize="100%">{buttonText}</MyButton>
        </Link>
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

export default TextWithImageAndButton;
