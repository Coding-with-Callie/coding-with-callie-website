import {
  Box,
  Checkbox,
  IconButton,
  Input,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import ImageWithBorder from "./ImageWithBorder";
import { Link } from "react-router-dom";
import MyButton from "../MyButton";
import Alert from "../Profile/Alert";
import { useRef, useState } from "react";
import axios from "axios";
import { host } from "../..";
import { ResourceType } from "../../Pages/Home";
import { toast } from "react-toastify";
import {
  FaRegCheckCircle,
  FaRegEdit,
  FaRegHandPointDown,
  FaRegHandPointUp,
  FaRegTrashAlt,
} from "react-icons/fa";

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
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  textBlocksValue: string;
  order: number;
  numResources: number;
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
  edit,
  setEdit,
  textBlocksValue,
  order,
  numResources,
}: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [headingValue, setHeadingValue] = useState(heading);
  const [linkUrlValue, setLinkUrlValue] = useState(linkUrl);
  const [buttonTextValue, setButtonTextValue] = useState(buttonText);
  const [targetValue, setTargetValue] = useState(target);
  const [image, setImage] = useState();
  const [fileInputKey, setFileInputKey] = useState<string>("");

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

  const editResource = () => {
    setEdit(!edit);
    console.log("Order:", order);
  };

  const onChangeHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadingValue(e.target.value);
  };

  const onChangeLinkUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrlValue(e.target.value);
  };

  const onChangeButtonText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonTextValue(e.target.value);
  };

  const onChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetValue(e.target.checked ? "_blank" : "_self");
  };

  const moveResource = (direction: string) => {
    order = direction === "up" ? order - 1 : order + 1;
    document.getElementById(order.toString())?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    axios
      .post(
        `${host}/api/auth/resource/${id}/order`,
        {
          direction,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setResources(response.data);
      })
      .catch(() => {
        toast.error("Error moving resource");
      });
  };

  const submitEdit = () => {
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    formData.append("heading", headingValue);
    formData.append("bodyText", textBlocksValue);
    formData.append("buttonText", buttonTextValue);
    formData.append("linkUrl", linkUrlValue);
    formData.append("target", (targetValue === "_blank").toString());

    axios
      .put(`${host}/api/auth/resource/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setResources(response.data);
        setEdit(false);
        toast.success("Resource updated successfully");
        setFileInputKey(new Date().getTime().toString());
      })
      .catch(() => {
        toast.error("Error updating resource");
      });
  };

  return (
    <>
      <Box w="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {edit ? (
            <Input
              type="text"
              layerStyle="inputResource"
              variant="filled"
              id="heading"
              value={headingValue}
              mb={6}
              mr={2}
              onChange={onChangeHeading}
              isInvalid={headingValue === ""}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
          ) : (
            <BodyHeading textAlignCenter={false}>{heading}</BodyHeading>
          )}
          {editable && (
            <Box mb={6} display="flex" gap={2}>
              <IconButton
                aria-label={"edit resource"}
                icon={edit ? <FaRegCheckCircle /> : <FaRegEdit />}
                onClick={edit ? submitEdit : editResource}
                colorScheme="green"
              />
              {order > 1 && (
                <IconButton
                  aria-label={"move resource up"}
                  icon={<FaRegHandPointUp />}
                  onClick={moveResource.bind(null, "up")}
                  colorScheme="blue"
                />
              )}
              {order !== numResources && (
                <IconButton
                  aria-label={"move resource down"}
                  icon={<FaRegHandPointDown />}
                  onClick={moveResource.bind(null, "down")}
                  colorScheme="blue"
                />
              )}
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
          mb={6}
          alignItems="center"
        >
          {children}
          <ImageWithBorder
            imageUrl={imageUrl}
            edit={edit}
            fileInputKey={fileInputKey}
            setImage={setImage}
          />
        </Box>
        {edit ? (
          <Box>
            <Input
              type="text"
              layerStyle="inputResource"
              variant="filled"
              id="link"
              value={linkUrlValue}
              onChange={onChangeLinkUrl}
              isInvalid={linkUrlValue === ""}
              mb={2}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
            <Box display="flex" gap={6} alignItems="center">
              <Input
                type="text"
                layerStyle="inputResource"
                variant="filled"
                id="buttonText"
                value={buttonTextValue}
                onChange={onChangeButtonText}
                isInvalid={buttonTextValue === ""}
                _hover={{ backgroundColor: "gray.50" }}
                _focus={{ backgroundColor: "white" }}
              />
              <Box
                width="25%"
                backgroundColor="white"
                lineHeight="40px"
                borderRadius={5}
                textAlign="center"
                _hover={{ backgroundColor: "gray.50" }}
              >
                <Checkbox
                  layerStyle="inputResource"
                  onChange={onChangeTarget}
                  isChecked={targetValue === "_blank"}
                >
                  Open Link in New Tab
                </Checkbox>
              </Box>
            </Box>
          </Box>
        ) : (
          <Link to={linkUrl} target={target === "_blank" ? "_blank" : "_self"}>
            <MyButton widthSize="100%">{buttonText}</MyButton>
          </Link>
        )}
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
