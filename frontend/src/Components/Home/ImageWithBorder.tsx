import {
  AspectRatio,
  Image,
  useMediaQuery,
  Box,
  Input,
} from "@chakra-ui/react";

type Props = {
  imageUrl: string;
  edit: boolean;
  setImage: React.Dispatch<any>;
  fileInputKey: string;
};

const ImageWithBorder = ({ imageUrl, edit, setImage, fileInputKey }: Props) => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  const onChangeImage = (e: React.ChangeEvent<any>) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box
      margin="0 auto"
      backgroundColor={edit ? "#EDF2F7" : "white"}
      p={5}
      borderRadius={4}
      boxShadow="lg"
    >
      <AspectRatio w={isLargerThan525 ? "450px" : "300px"} ratio={16 / 9}>
        {edit ? (
          <Input
            p={0}
            border="none"
            borderRadius="0px"
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            key={fileInputKey}
            backgroundColor="#EDF2F7"
          />
        ) : (
          <Image src={imageUrl} borderRadius={4} border={"1px solid #A9A9A9"} />
        )}
      </AspectRatio>
    </Box>
  );
};

export default ImageWithBorder;
