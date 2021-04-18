import { useToast } from "@chakra-ui/react";
import { QueryKey, useQueryClient } from "react-query";
import {
  AlbumGridItemFragment,
  AlbumReviewsQuery,
  useUpdateAlbumMutation
} from "../../graphql/types";

export interface UseUpdateAlbumProps {
  album: AlbumGridItemFragment;
  onCancel: () => void;
}

export default function useUpdateAlbum(
  props: UseUpdateAlbumProps
): ReturnType<typeof useUpdateAlbumMutation> {
  const { album, onCancel } = props;
  const { id } = album;

  const toast = useToast();

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["AlbumReviews", { id }];

  return useUpdateAlbumMutation({
    onMutate: async variables => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<AlbumReviewsQuery>(queryKey);
      queryClient.setQueryData<AlbumReviewsQuery | undefined>(
        queryKey,
        old =>
          old && {
            album: {
              ...old.album,
              name: variables.input.name,
              year: variables.input.year
            }
          }
      );
      return { previous };
    },
    onSuccess() {
      onCancel();
      toast({
        description: "Album updated",
        isClosable: true,
        position: "bottom",
        status: "success",
        title: "Success"
      });
    },
    onError(error, _variables, context: any) {
      queryClient.setQueryData(queryKey, context.previous);
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Save not completed"
      });
    },
    onSettled() {
      queryClient.invalidateQueries(queryKey);
    }
  });
}
