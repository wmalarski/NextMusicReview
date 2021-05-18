import { Meta, Story } from "@storybook/react";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import { albumGridItemDefault } from "../../../tests/defaults";
import AlbumDeleteButton, { AlbumDeleteButtonProps } from "./AlbumDeleteButton";

export default {
  title: "Album/AlbumDeleteButton",
  component: AlbumDeleteButton,
  args: { album: albumGridItemDefault }
} as Meta;

const Template: Story<AlbumDeleteButtonProps> = args => (
  <TestWrapper>
    <AlbumDeleteButton {...args} />
  </TestWrapper>
);

export const Playground = Template.bind({});
