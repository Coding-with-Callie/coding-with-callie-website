import { useState } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  rating: any;
  setRating: any;
  count: number;
  isInvalid: boolean;
};

export default function StarRating({
  rating,
  setRating,
  count,
  isInvalid,
}: Props) {
  const [hover, setHover] = useState<any>(null);
  return (
    <Box display="flex" gap={setRating ? 2 : 1}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue: any = index + 1;
        return setRating ? (
          <Box
            as={"button"}
            key={index}
            onMouseEnter={() => {
              setRating(0);
              setHover(ratingValue);
            }}
            onMouseLeave={() => {
              setRating(ratingValue);
              setHover(null);
            }}
            onClick={() => {
              setRating(ratingValue);
            }}
          >
            <svg
              height="30px"
              width="30px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-1 0 49.94 48.94"
              stroke={
                rating !== null ? "#79aace" : isInvalid ? "red" : "#45446A"
              }
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill={
                    ratingValue <= (hover || rating) ? "#79aace" : "#edf2f6"
                  }
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                ></path>{" "}
              </g>
            </svg>
          </Box>
        ) : (
          <Box>
            <svg
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-1 0 49.94 48.94"
              stroke={rating !== null ? "#79aace" : "#45446A"}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill={
                    ratingValue <= (hover || rating) ? "#79aace" : "#edf2f6"
                  }
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                ></path>{" "}
              </g>
            </svg>
          </Box>
        );
      })}
    </Box>
  );
}
