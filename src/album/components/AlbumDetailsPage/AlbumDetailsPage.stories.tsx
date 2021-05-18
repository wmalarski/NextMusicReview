import { Meta, Story } from "@storybook/react";
import React from "react";
import AlbumDetailsPage, {
  AlbumDetailsPageProps
} from "../../../pages/albums/[id]";
import TestWrapper from "../../../tests/components/TestWrapper";

export default {
  title: "Album/AlbumDetailsPage",
  component: AlbumDetailsPage,
  args: {
    id: "albumId"
  }
} as Meta;

const Template: Story<AlbumDetailsPageProps> = args => (
  <TestWrapper>
    <AlbumDetailsPage {...args} />
  </TestWrapper>
);

export const Playground = Template.bind({});
