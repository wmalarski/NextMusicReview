import { Box, Container, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import AlbumGrid from "../../../album/components/AlbumGrid/AlbumGrid";
import { compact } from "../../../common/functions";
import { PerformerDetailsQuery } from "../../../graphql/types";
import ReviewAlbumsList from "../../../review/components/ReviewAlbumsList/ReviewAlbumsList";
import PerformerActionsBar from "../PerformerActionsBar/PerformerActionsBar";

export interface PerformerDetailsProps {
  query?: PerformerDetailsQuery;
}

export default function PerformerDetails(
  props: PerformerDetailsProps
): JSX.Element {
  const { query } = props;

  const { performer } = query ?? {};
  const { name, albums } = performer ?? {};
  const isLoading = !query;

  const albumNodes = React.useMemo(() => compact(albums?.nodes) ?? [], [
    albums?.nodes
  ]);

  const albumReviews = React.useMemo(
    () =>
      compact(
        albumNodes.flatMap(
          album =>
            album?.reviews?.nodes?.map(review => ({ album, review })) ?? []
        )
      ),
    [albumNodes]
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
        {/* <WikiText isLoading={isLoading} wiki={details?.bio} /> */}
        {albumNodes.length > 0 && <Heading size="lg">Albums</Heading>}
        <AlbumGrid
          albums={albumNodes}
          isLoading={isLoading}
          defaultCount={albums?.nodes?.length ?? 5}
        />
        {albumReviews.length > 0 && <Heading size="lg">Reviews</Heading>}
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
