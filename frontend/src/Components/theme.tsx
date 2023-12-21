import { extendTheme } from "@chakra-ui/react";

const purple = "#45446A";
const green = "#E1E7CD";

const theme = extendTheme({
  fonts: {
    heading: `'Pacifico', cursive`,
    body: `'Sometype Mono', monospace`,
  },
  layerStyles: {
    button: {
      color: green,
      borderColor: purple,
      backgroundColor: purple,
      _hover: { color: purple, backgroundColor: green },
      _active: {
        color: purple,
        transform: "scale(0.98)",
        backgroundColor: green,
      },
    },
  },
});

export default theme;
