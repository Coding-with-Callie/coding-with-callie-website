import { Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlign?: "center" | "left";
  mb?: number;
};

const BodyHeading = ({ children, textAlign = "left", mb = 6 }: Props) => {
  return (
    <Heading layerStyle="heading" fontSize={28} mb={mb} textAlign={textAlign}>
      {children}
    </Heading>
  );
};

export default BodyHeading;
