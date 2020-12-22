import {
  ChatIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  SearchIcon
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import WikiText from "../../common/components/wikiText";
import { AlbumDetailsQuery, AlbumReviewsQuery } from "../../graphql/types";

export interface AlbumDetailsProps {
  id: string;
  detailsQuery: AlbumDetailsQuery;
  reviewsQuery: AlbumReviewsQuery;
}

export default function AlbumDetails(props: AlbumDetailsProps): JSX.Element {
  const { detailsQuery, reviewsQuery } = props;

  const { wiki } = detailsQuery.album.details ?? {};
  const { reviews, name, performer, details, year } = reviewsQuery.album;

  const image = details?.image.find(img => img.size === "extralarge");

  return (
    <Stack>
      <Flex justify="space-between" wrap="wrap">
        <HStack>
          {image?.url && <Image src={image.url} alt={name} />}
          <Box alignItems="center" flexGrow={1}>
            <Heading as="h2" size="lg">
              {name}
            </Heading>
            <Heading as="h4" size="md">
              <NextLink href={`/performers/${performer?.id}`}>
                <Link>{performer?.name}</Link>
              </NextLink>
            </Heading>
            <Heading as="h6" size="xs">
              {year}
            </Heading>
          </Box>
        </HStack>
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<SearchIcon />}>YouTube</MenuItem>
            <MenuItem icon={<ChatIcon />}>Review</MenuItem>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WikiText isLoading={false} wiki={wiki} />
      <Heading as="h4" size="md">
        Reviews
      </Heading>
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
    </Stack>
  );
}
