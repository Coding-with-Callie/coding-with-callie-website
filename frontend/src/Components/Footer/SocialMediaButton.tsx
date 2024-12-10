import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { button } from "../theme";
import { lightenByPercentage } from "../../helpers/helpers";
import { GrGithub, GrLinkedin, GrMail, GrYoutube } from "react-icons/gr";

type Props = {
  type: "linkedin" | "youtube" | "github" | "mail";
};

const links = {
  linkedin: "https://www.linkedin.com/in/cstoscup/",
  youtube: "https://www.youtube.com/@codingwithcallie",
  github: "https://github.com/cstoscup",
  mail: "/contact",
};

const SocialMediaButton = ({ type }: Props) => {
  const [color, setColor] = useState(button);

  return (
    <Box
      border="2px"
      borderColor={button}
      borderRadius="50%"
      p={4}
      onClick={() => {
        window.open(links[type], type === "mail" ? "_self" : "_blank");
      }}
      onMouseEnter={() => setColor(lightenByPercentage(button, -20))}
      onMouseLeave={() => setColor(button)}
      onMouseDown={() => setColor(lightenByPercentage(button, -40))}
    >
      {type === "linkedin" && <GrLinkedin color={color} size={28} />}
      {type === "youtube" && <GrYoutube color={color} size={28} />}
      {type === "github" && <GrGithub color={color} size={28} />}
      {type === "mail" && <GrMail color={color} size={28} />}
    </Box>
  );
};

export default SocialMediaButton;
