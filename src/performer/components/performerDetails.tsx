import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack
} from "@chakra-ui/react";
import compact from "lodash/compact";
import React from "react";
import AlbumGrid from "../../album/components/albumGrid";
import WikiText from "../../common/components/wikiText";
import { PerformerDetailsQuery } from "../../graphql/types";

export interface PerformerDetailsProps {
  id: string;
  query: PerformerDetailsQuery;
}

export default function PerformerDetails(
  props: PerformerDetailsProps
): JSX.Element {
  const { query } = props;

  const { details, name, albums } = query?.performer;

  return (
    <Stack>
      <Flex justify="space-between" wrap="wrap">
        <Box alignItems="center" flexGrow={1}>
          <Heading as="h2" size="lg">
            {name}
          </Heading>
        </Box>
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <WikiText isLoading={false} wiki={details?.bio} />
      <Heading as="h4" size="md">
        Albums
      </Heading>
      <AlbumGrid
        albums={compact(albums?.nodes)}
        isLoading={false}
        defaultCount={albums?.nodes?.length ?? 5}
      />
    </Stack>
  );
}
