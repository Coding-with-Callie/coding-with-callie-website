import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";

type Props = {
  rating: any;
  setRating: any;
  count: number;
  size: any;
};

export default function StarRating({ rating, setRating, count, size }: Props) {
  // count:  number of stars you want, pass as props
  //size: size of star that you want

  const [hover, setHover] = useState<any>(null);
  return (
    <HStack spacing={"2px"}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue: any = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              display="none"
            ></Radio>
            <FaStar cursor={"pointer"} size={size || 20} />
          </Box>
        );
      })}
    </HStack>
  );
}
