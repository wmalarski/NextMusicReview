import { useMediaQuery } from "@chakra-ui/media-query";
import { useTheme } from "@chakra-ui/react";

export default function useMinWidthQuery(breakpoint: string): boolean {
  const theme = useTheme();
  return useMediaQuery(`(min-width: ${theme.breakpoints[breakpoint]})`)[0];
}
