import { Meta, Story } from "@storybook/react";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { albumGridItemDefault } from "../../../tests/defaults";
import AlbumActionsBar, { AlbumActionsBarProps } from "./AlbumActionsBar";

export default {
  title: "Album/AlbumActionsBar",
  component: AlbumActionsBar,
  args: { album: albumGridItemDefault }
} as Meta;

const Template: Story<AlbumActionsBarProps> = args => (
  <TestWrapper>
    <AlbumActionsBar {...args} />
  </TestWrapper>
);

export const Playground = Template.bind({});
