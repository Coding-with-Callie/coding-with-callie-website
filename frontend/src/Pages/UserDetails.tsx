import { Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import Profile, { Data } from "./Profile";

const UserDetails = () => {
  const data = useLoaderData() as Data;
  console.log("LOADER DATA:", data);
  return <Box>hi</Box>;
};

export default UserDetails;
