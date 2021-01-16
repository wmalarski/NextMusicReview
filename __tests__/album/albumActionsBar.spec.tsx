import { mount } from "enzyme";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AlbumActionsBar, {
  AlbumActionsBarProps
} from "../../src/album/components/albumActionsBar";
import { waitForComponentToPaint } from "../utils";

function getAlbumActionsBar(
  props: Partial<AlbumActionsBarProps> = {}
): JSX.Element {
  const queryClient = new QueryClient();
  const defaultProps: AlbumActionsBarProps = {
    album: {
      id: "id",
      mBid: "mBid",
      name: "name",
      year: 1999,
      details: {
        image: [
          {
            size: "small",
            url: "url"
          }
        ]
      }
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AlbumActionsBar {...{ ...defaultProps, ...props }} />
    </QueryClientProvider>
  );
}

/** @test {Title Component} */
describe("AlbumActionsBar Component", () => {
  it("should render without crashing", () => {
    const wrapper = mount(getAlbumActionsBar());
    waitForComponentToPaint(wrapper);
    expect(wrapper.find("button")).toHaveLength(10);
  });

  it("have Youtube button", () => {
    const wrapper = mount(getAlbumActionsBar());
    waitForComponentToPaint(wrapper);
    const chakraButton = wrapper.find("#youtube-button");
    const button = chakraButton.find("button");
    console.log("button", button, chakraButton.children());
    // expect(button).toHaveLength(7);
  });
});
