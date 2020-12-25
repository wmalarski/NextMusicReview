import { HStack } from "@chakra-ui/react";
import React from "react";
import { PerformerDetailsFragment } from "../../graphql/types";
import PerformerDeleteButton from "./performerDeleteButton";
import PerformerUpdatePopover from "./performerUpdatePopover";

export interface PerformerActionsBarProps {
  performer?: PerformerDetailsFragment | null;
}

export default function PerformerActionsBar(
  props: PerformerActionsBarProps
): JSX.Element | null {
  const { performer } = props;

  if (!performer) return null;

  return (
    <HStack>
      <PerformerDeleteButton performer={performer} />
      <PerformerUpdatePopover performer={performer} />
    </HStack>
  );
}
