import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { button } from "../theme";
import { lightenByPercentage } from "../../helpers/helpers";
import { GrGithub, GrLinkedin, GrMail, GrYoutube } from "react-icons/gr";

type Props = {
  type: string;
};

const links = {
  linkedin: "https://www.linkedin.com/in/cstoscup/",
  youtube: "https://www.youtube.com/@codingwithcallie",
  github: "https://github.com/cstoscup",
  mail: "/contact",
};

const SocialMediaButton = ({ type }: Props) => {
  const [color, setColor] = useState(button);

  const handleClick = () => {
    switch (type) {
      case "linkedin":
        window.open(links.linkedin, "_blank");
        break;
      case "youtube":
        window.open(links.youtube, "_blank");
        break;
      case "github":
        window.open(links.github, "_blank");
        break;
      case "mail":
        window.open(links.mail, "_self");
        break;
    }
  };

  return (
    <Box
      border="2px"
      borderColor={button}
      borderRadius="50%"
      p={4}
      onClick={handleClick}
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
