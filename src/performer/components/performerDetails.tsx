import { Box, Container, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import AlbumGrid from "../../album/components/albumGrid";
import WikiText from "../../common/components/wikiText";
import { compact } from "../../common/functions";
import { PerformerDetailsQuery } from "../../graphql/types";
import ReviewAlbumsList from "../../review/components/reviewAlbumsList";
import PerformerActionsBar from "./performerActionsBar";

export interface PerformerDetailsProps {
  id: string;
  query?: PerformerDetailsQuery;
}

export default function PerformerDetails(
  props: PerformerDetailsProps
): JSX.Element {
  const { query } = props;

  const { performer } = query ?? {};
  const { details, name, albums } = performer ?? {};
  const isLoading = !query;

  const albumReviews = React.useMemo(
    () =>
      compact(
        albums?.nodes?.flatMap(
          album =>
            album?.reviews?.nodes?.map(review => ({ album, review })) ?? []
        )
      ),
    [albums?.nodes]
  );

  return (
    <Container maxW="2xl">
      <Stack spacing={10}>
        <Box alignItems="center" flexGrow={1}>
          {isLoading ? (
            <Skeleton size="lg" width="100%" height="3rem" />
          ) : (
            <Heading as="h2" size="lg" variant="primary">
              {name}
            </Heading>
          )}
        </Box>
        {performer && (
          <Stack direction={{ base: "column", md: "row" }}>
            <PerformerActionsBar performer={performer} />
          </Stack>
        )}
        <WikiText isLoading={isLoading} wiki={details?.bio} />
        <Heading size="lg">Albums</Heading>
        <AlbumGrid
          albums={compact(albums?.nodes)}
          isLoading={isLoading}
          defaultCount={albums?.nodes?.length ?? 5}
        />
        <Heading size="lg">Reviews</Heading>
        <ReviewAlbumsList
          showImage
          pairs={albumReviews}
          isLoading={isLoading}
          defaultCount={albums?.nodes?.length ?? 5}
        />
      </Stack>
    </Container>
  );
}
