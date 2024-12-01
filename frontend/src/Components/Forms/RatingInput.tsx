import { Box, FormLabel } from "@chakra-ui/react";
import StarRating from "../Reviews/StarRating";

type Props = {
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  isInvalid: boolean;
};

const RatingInput = ({ data, setData, isInvalid }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">Rating</FormLabel>
      <StarRating
        data={data}
        setData={setData}
        count={5}
        isInvalid={isInvalid}
      />
    </Box>
  );
};

export default RatingInput;
