import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const inputBlue = "#eaf2f7";
const blue = "#3e7aa6";
const darkBlue = "#2b5574";

const theme = extendTheme(
  {
    colors: {
      button: {
        100: "#c6a1b2",
        200: "#bc91a5",
        300: "#b38199",
        400: "#a9728c",
        500: "#a0627f",
        600: "#915872",
        700: "#814e66",
        800: "#714459",
        900: "#603a4c",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "button",
    components: ["Button"],
  }),
  {
    fonts: {
      heading: `'Pacifico', cursive`,
      body: `'Sometype Mono', monospace`,
    },
    layerStyles: {
      input: {
        color: darkBlue,
        backgroundColor: inputBlue,
      },
      inputResource: {
        color: darkBlue,
        backgroundColor: "white",
        _hover: { backgroundColor: "gray.50" },
        _focus: { backgroundColor: "white" },
      },
      heading: {
        color: blue,
      },
      text: {
        color: darkBlue,
      },
      boxButton: {
        border: "1px solid #3e7aa6",
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
  }
);

export default theme;
