import { useToast } from "@chakra-ui/react";
import { QueryKey, useQueryClient } from "react-query";
import { useCreateReviewMutation } from "../../graphql/types";

export interface UseCreateReviewProps {
  albumId: string;
  onCancel: () => void;
}

export default function useCreateReview(
  props: UseCreateReviewProps
): ReturnType<typeof useCreateReviewMutation> {
  const { albumId, onCancel } = props;

  const toast = useToast();

  const queryClient = useQueryClient();
  const key: QueryKey = ["AlbumReviews", { id: albumId }];

  return useCreateReviewMutation({
    onSuccess() {
      queryClient.invalidateQueries(key);
      onCancel();
      toast({
        description: "Review added",
        isClosable: true,
        position: "bottom",
        status: "success",
        title: "Success"
      });
    },
    onError(error) {
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Error"
      });
    }
  });
}
