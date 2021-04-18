import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  AlbumGridItemFragment,
  useDeleteAlbumMutation
} from "../../graphql/types";

export interface UseAlbumDeleteProps {
  album: AlbumGridItemFragment;
}

export default function useAlbumDelete(
  props: UseAlbumDeleteProps
): ReturnType<typeof useDeleteAlbumMutation> {
  const { album } = props;
  const { performer } = album;

  const router = useRouter();
  const toast = useToast();

  return useDeleteAlbumMutation({
    onSuccess(data) {
      if (!data.deleteAlbum.success) {
        toast({
          description: (data.deleteAlbum.errors ?? []).join(","),
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Cannot remove album"
        });
      } else {
        const path = performer ? `/performers/${performer.id}` : "/";
        router.push(path);
      }
    },
    onError(error) {
      toast({
        description: String(error),
        isClosable: true,
        position: "bottom",
        status: "error",
        title: "Cannot remove album"
      });
    }
  });
}
