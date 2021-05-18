import { Meta, Story } from "@storybook/react";
import React from "react";
import TestWrapper from "../../../tests/components/TestWrapper";
import {
  albumDetailsQueryDefault,
  albumGridItemDefault
} from "../../../tests/defaults";
import AlbumDetails, { AlbumDetailsProps } from "./AlbumDetails";

export default {
  title: "Album/AlbumDetails",
  component: AlbumDetails,
  args: {
    id: "albumId",
    isLoading: false,
    detailsQuery: albumDetailsQueryDefault,
    reviewsQuery: { album: albumGridItemDefault }
  }
} as Meta;

const Template: Story<AlbumDetailsProps> = args => (
  <TestWrapper>
    <AlbumDetails {...args} />
  </TestWrapper>
);

export const Playground = Template.bind({});
