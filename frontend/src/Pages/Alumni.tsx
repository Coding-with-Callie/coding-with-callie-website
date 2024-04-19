import { useLoaderData } from "react-router-dom";
import { Workshop } from "./Workshops";
import { Box } from "@chakra-ui/react";
import AlumniCard from "../Components/Alumni/AlumniCard";

export type AlumniType = {
  id: number;
  name: string;
  opportunities: string[];
  bioText: string[];
  linkedInUrl: string;
  photoUrl: string;
  projectUrl: string;
  workshop: Workshop;
  demoUrl: string;
};

function Alumni() {
  let alumni = useLoaderData() as AlumniType[];

  console.log("alumni", alumni);

  return (
    <Box m={"0 auto"}>
      {alumni.map((alumni, index) => {
        return <AlumniCard key={index} alumni={alumni} />;
      })}
    </Box>
  );
}

export default Alumni;
