import { ChatIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack
} from "@chakra-ui/react";
import React from "react";
import { AlbumItem } from "../types";
import AlbumDrawerContent from "./albumDrawerContent";

export interface AlbumDrawerProps {
  selectedAlbum?: AlbumItem;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AlbumDrawer(props: AlbumDrawerProps): JSX.Element {
  const { selectedAlbum, setSelectedId } = props;

  return (
    <Drawer
      isOpen={!!selectedAlbum}
      placement="right"
      onClose={() => setSelectedId(null)}
      size="lg"
    >
      <DrawerOverlay>
        {selectedAlbum && (
          <DrawerContent>
            <DrawerCloseButton />
            <AlbumDrawerContent album={selectedAlbum} />
            <DrawerFooter>
              <HStack>
                <Button leftIcon={<SearchIcon />} color="red">
                  YouTube
                </Button>
                <Button leftIcon={<ChatIcon />} color="blue">
                  Review
                </Button>
                <Button leftIcon={<EditIcon />} color="blue">
                  Edit
                </Button>
                <Button leftIcon={<DeleteIcon />} color="blue">
                  Remove
                </Button>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={() => setSelectedId(null)}
                >
                  Cancel
                </Button>
              </HStack>
            </DrawerFooter>
          </DrawerContent>
        )}
      </DrawerOverlay>
    </Drawer>
  );
}
