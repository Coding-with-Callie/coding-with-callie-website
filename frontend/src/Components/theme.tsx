import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { getColors, lightenByPercentage } from "../helpers/helpers";

export const heading = "#3e7aa6";
export const text = "#2b5574";
export const button = "#a0627f";
export const mainBackground = "#9eadbd";
export const contentBackground = "white";

const theme = extendTheme(
  {
    colors: {
      button: getColors(button),
      heading: heading,
      text: text,
    },
    components: {
      Heading: {
        baseStyle: {
          color: heading,
        },
      },
      Text: {
        baseStyle: {
          color: text,
        },
      },
      FormLabel: {
        baseStyle: {
          color: text,
        },
      },
      Input: {
        variants: {
          filled: {
            field: {
              color: text,
              backgroundColor: lightenByPercentage(text, 90),
              _hover: {
                backgroundColor: lightenByPercentage(text, 95),
                color: text,
              },
              _focus: {
                backgroundColor: lightenByPercentage(text, 95),
                borderColor: text,
                color: text,
              },
            },
          },
        },
      },
      Textarea: {
        variants: {
          filled: {
            backgroundColor: lightenByPercentage(text, 90),
            color: text,
            _hover: {
              backgroundColor: lightenByPercentage(text, 95),
              color: text,
            },
            _focus: {
              backgroundColor: lightenByPercentage(text, 95),
              borderColor: text,
              color: text,
            },
          },
        },
      },
      Checkbox: {
        baseStyle: {
          control: {
            borderColor: text,
          },
          label: {
            color: text,
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
    },
  }
);

export default theme;
