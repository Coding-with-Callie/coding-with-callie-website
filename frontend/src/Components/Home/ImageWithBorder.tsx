import { AspectRatio, Image, useMediaQuery, Input } from "@chakra-ui/react";

type Props = {
  imageUrl: string;
  edit: boolean;
  setImage: React.Dispatch<any>;
  fileInputKey: string;
};

const ImageWithBorder = ({ imageUrl, edit, setImage, fileInputKey }: Props) => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  const onChangeImage = (e: React.ChangeEvent<any>) => {
    setImage(e.target.files[0]);
  };

  return (
    <AspectRatio
      w={isLargerThan1300 ? "50%" : isLargerThan525 ? "75%" : "100%"}
      ratio={16 / 9}
      margin="0 auto"
      borderRadius={4}
      boxShadow="lg"
    >
      {edit ? (
        <Input
          p={0}
          border="none"
          borderRadius="0px"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
          key={fileInputKey}
          backgroundColor="white"
        />
      ) : (
        <Image src={imageUrl} borderRadius={4} border={"1px solid #A9A9A9"} />
      )}
    </AspectRatio>
  );
};

export default ImageWithBorder;
