import { border, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { getColors, lightenByPercentage } from "../helpers/helpers";
import { color } from "framer-motion";
import { Form } from "react-router-dom";

const blue = "#3e7aa6";
const darkBlue = "#2b5574";
const pink = "#a0627f";

const theme = extendTheme(
  {
    colors: {
      button: getColors(pink),
      heading: blue,
      text: darkBlue,
    },
    components: {
      Heading: {
        baseStyle: {
          color: blue,
        },
      },
      Text: {
        baseStyle: {
          color: darkBlue,
        },
      },
      FormLabel: {
        baseStyle: {
          color: darkBlue,
        },
      },
      Input: {
        variants: {
          filled: {
            field: {
              color: darkBlue,
              backgroundColor: lightenByPercentage(darkBlue, 90),
              _hover: {
                backgroundColor: lightenByPercentage(darkBlue, 95),
                color: darkBlue,
              },
              _focus: {
                backgroundColor: lightenByPercentage(darkBlue, 95),
                borderColor: darkBlue,
                color: darkBlue,
              },
            },
          },
        },
      },
      Textarea: {
        variants: {
          filled: {
            backgroundColor: lightenByPercentage(darkBlue, 90),
            color: darkBlue,
            _hover: {
              backgroundColor: lightenByPercentage(darkBlue, 95),
              color: darkBlue,
            },
            _focus: {
              backgroundColor: lightenByPercentage(darkBlue, 95),
              borderColor: darkBlue,
              color: darkBlue,
            },
          },
        },
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
