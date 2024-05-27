import { AspectRatio, Image, useMediaQuery, Box } from "@chakra-ui/react";

type Props = {
  imageUrl: string;
};

const ImageWithBorder = ({ imageUrl }: Props) => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  return (
    <Box
      margin="0 auto"
      backgroundColor="white"
      p={5}
      borderRadius={4}
      boxShadow="lg"
    >
      <AspectRatio w={isLargerThan525 ? "450px" : "300px"} ratio={16 / 9}>
        <Image src={imageUrl} borderRadius={4} border={"1px solid #A9A9A9"} />
      </AspectRatio>
    </Box>
  );
};

export default ImageWithBorder;
