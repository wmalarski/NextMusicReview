import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { AlbumGridItemFragment } from "../../../graphql/types";
import useAlbumDelete from "../../queries/useDeleteAlbum";

export interface AlbumDeleteButtonProps {
  album: AlbumGridItemFragment;
}

export default function AlbumDeleteButton(
  props: AlbumDeleteButtonProps
): JSX.Element {
  const { album } = props;
  const { id } = album;

  const { mutate, isLoading } = useAlbumDelete({ album });

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
