import React from "react";
import useMinWidthQuery from "../../../common/hooks/useMinBreakpoint";
import { PerformerDetailsFragment } from "../../../graphql/types";
import PerformerDeleteButton from "../PerformerDeleteButton/PerformerDeleteButton";
import PerformerUpdateAccordion from "../PerformerUpdateAccordion/PerformerUpdateAccordion";
import PerformerUpdatePopover from "../PerformerUpdatePopover/PerformerUpdatePopover";

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
