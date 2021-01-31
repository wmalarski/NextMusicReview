import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  AlbumGridItemFragment,
  useDeleteAlbumMutation
} from "../../graphql/types";

export interface AlbumDeleteButtonProps {
  album: AlbumGridItemFragment;
}

export default function AlbumDeleteButton(
  props: AlbumDeleteButtonProps
): JSX.Element {
  const { album } = props;
  const { id, performer } = album;

  const router = useRouter();

  const { mutate, isLoading } = useDeleteAlbumMutation({
    onSuccess(data) {
      if (!data.deleteAlbum.success) return;
      const path = performer ? `/performers/${performer.id}` : "/";
      console.log("onSuccess", performer, path, router.push);
      router.push(path);
    }
  });

  return (
    <Button
      isLoading={isLoading}
      leftIcon={<DeleteIcon />}
      onClick={() => mutate({ input: { id } })}
    >
      Delete
    </Button>
  );
}
