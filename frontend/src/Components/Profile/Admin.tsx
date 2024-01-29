import { Avatar, Box, Heading, Image } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import { useEffect, useState } from "react";
import axios from "axios";

export type User = {
  email: string;
  id: number;
  name: string;
  password: string;
  photo: string | null;
  role: string;
  username: string;
};

const Admin = () => {
  const [users, setUsers] = useState<User[]>([
    {
      email: "",
      id: 1,
      name: "",
      password: "",
      photo: "",
      role: "",
      username: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API || "http://localhost:3001/api"}/users`)
      .then((response) => {
        setUsers(response.data.filter((user: User) => user.name !== "deleted"));
      });
  }, []);

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={false}>Admin</BodyHeading>
      <Box display="flex">
        <Paragraph>Users:</Paragraph>
        <Box>{users.length}</Box>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {users.map((user) => {
          return (
            <Box display="flex" alignItems="center" gap={2} w="33.3%" mb={5}>
              <Avatar name={user.name} src={user.photo ? user.photo : ""} />
              <Paragraph margin={false}>{user.name}</Paragraph>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
};

export default Admin;
