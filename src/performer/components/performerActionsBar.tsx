import { useBreakpoint } from "@chakra-ui/react";
import React from "react";
import { PerformerDetailsFragment } from "../../graphql/types";
import PerformerDeleteButton from "./performerDeleteButton";
import PerformerUpdateAccordion from "./performerUpdateAccordion";
import PerformerUpdatePopover from "./performerUpdatePopover";

export interface PerformerActionsBarProps {
  performer?: PerformerDetailsFragment | null;
}

export default function PerformerActionsBar(
  props: PerformerActionsBarProps
): JSX.Element | null {
  const { performer } = props;

  const breakpoint = useBreakpoint();

  if (!performer) return null;

  return (
    <>
      <PerformerDeleteButton performer={performer} />
      {breakpoint === "md" ? (
        <PerformerUpdatePopover performer={performer} />
      ) : (
        <PerformerUpdateAccordion performer={performer} />
      )}
    </>
  );
}
