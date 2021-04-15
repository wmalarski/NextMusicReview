import React from "react";
import useMinWidthQuery from "../../common/hooks/useMinBreakpoint";
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

  const isMd = useMinWidthQuery("md");

  if (!performer) return null;

  return (
    <>
      <PerformerDeleteButton performer={performer} />
      {isMd ? (
        <PerformerUpdatePopover performer={performer} />
      ) : (
        <PerformerUpdateAccordion performer={performer} />
      )}
    </>
  );
}
