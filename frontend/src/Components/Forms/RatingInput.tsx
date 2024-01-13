import { Box, FormLabel } from "@chakra-ui/react";
import StarRating from "../Reviews/StarRating";

type Props = {
  rating: null | number;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
};

const RatingInput = ({ rating, setRating }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">Rating</FormLabel>
      <StarRating rating={rating} setRating={setRating} count={5} />
    </Box>
  );
};

export default RatingInput;
