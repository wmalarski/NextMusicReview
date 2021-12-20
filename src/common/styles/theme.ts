import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colorPrefix = "teal";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  layerStyles: {
    lightHover: {
      borderColor: `${colorPrefix}.400`,
      backgroundColor: "gray.50",
      cursor: "pointer"
    },
    darkHover: {
      borderColor: `${colorPrefix}.200`,
      backgroundColor: "gray.700",
      cursor: "pointer"
    }
  },
  shadows: {
    outline: "0 0 0 3px #319795"
  },
  components: {
    Text: {
      variants: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        primary: (props: any) => ({
          color:
            props.colorMode === "dark"
              ? `${colorPrefix}.200`
              : `${colorPrefix}.600`
        })
      }
    },
    Heading: {
      variants: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        primary: (props: any) => ({
          color:
            props.colorMode === "dark"
              ? `${colorPrefix}.200`
              : `${colorPrefix}.600`
        })
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: `${colorPrefix}.500`
      }
    }
  }
});

export default theme;
