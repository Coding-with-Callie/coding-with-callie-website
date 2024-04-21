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
    input: {
      color: purple,
    },
    heading: {
      color: "#79A9CD",
    },
    text: {
      color: "#45446A",
    },
    boxButton: {
      border: "1px solid #45446A",
      borderRadius: "md",
      backgroundColor: "white",
      boxShadow: "md",
      _hover: { cursor: "pointer", transform: "scale(1.005)" },
      _active: { transform: "scale(1)" },
    },
    accordionButton: {
      backgroundColor: "rgb(69, 68, 106, 0.75)",
      borderTopRadius: "md",
    },
    accordionPanel: {
      backgroundColor: "white",
      borderBottomRadius: "md",
    },
  },
});

export default theme;
