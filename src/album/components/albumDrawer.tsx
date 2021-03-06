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
import { AlbumGridItemFragment } from "../../graphql/types";
import AlbumActionsBar from "./albumActionsBar";
import AlbumDrawerContent from "./albumDrawerContent";

export interface AlbumDrawerProps {
  selectedAlbum?: AlbumGridItemFragment;
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
                <AlbumActionsBar album={selectedAlbum} />
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
