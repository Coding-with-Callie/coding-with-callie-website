import { AspectRatio, Image, useMediaQuery } from "@chakra-ui/react";

type Props = {
  imageUrl: string;
};

const ImageWithBorder = ({ imageUrl }: Props) => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <AspectRatio
      w={isLargerThan1300 ? "50%" : isLargerThan525 ? "75%" : "100%"}
      ratio={16 / 9}
      margin="0 auto"
      borderRadius={4}
      boxShadow="lg"
    >
      <Image src={imageUrl} borderRadius={4} border={"1px solid #A9A9A9"} />
    </AspectRatio>
  );
};

export default ImageWithBorder;
