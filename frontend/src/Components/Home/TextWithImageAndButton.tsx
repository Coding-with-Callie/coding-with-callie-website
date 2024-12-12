import { Box, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import ImageWithBorder from "./ImageWithBorder";
import { Link, useOutletContext } from "react-router-dom";
import MyButton from "../MyButton";
import { ResourceType } from "../../Pages/Home";
import BodyText from "../BodyText";
import Section from "../Section";
import { Context } from "../../App";
import EditIcons from "./EditIcons";

type Props = {
  resource: ResourceType;
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  numResources: number;
};

const TextWithImageAndButton = ({
  resource,
  setResources,
  setEdit,
  numResources,
}: Props) => {
  const { user } = useOutletContext() as Context;

  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Section>
      <Box w="100%">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={isLargerThan800 ? "row" : "column"}
        >
          <BodyHeading>{resource.heading}</BodyHeading>
          {user.role === "admin" && (
            <EditIcons
              id={resource.id}
              order={resource.order}
              numResources={numResources}
              setResources={setResources}
              setEdit={setEdit}
            />
          )}
        </Box>
        <Box
          display="flex"
          flexDirection={isLargerThan1300 ? "row" : "column"}
          gap={10}
          mb={6}
          alignItems="center"
        >
          <BodyText textBlocks={resource.bodyText} />
          <ImageWithBorder imageUrl={resource.imageUrl} />
        </Box>
        <Link
          to={resource.linkUrl}
          target={resource.target ? "_blank" : "_self"}
        >
          <MyButton>{resource.buttonText}</MyButton>
        </Link>
      </Box>
    </Section>
  );
};

export default TextWithImageAndButton;
