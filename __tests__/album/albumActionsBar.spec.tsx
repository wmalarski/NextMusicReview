import { ReactWrapper } from "enzyme";
import React from "react";
import AlbumActionsBar, {
  AlbumActionsBarProps
} from "../../src/album/components/albumActionsBar";
import { waitForComponentToPaint, withRouterContext } from "../utils";

function mountAlbumActionsBar(): ReactWrapper<AlbumActionsBarProps, any> {
  return withRouterContext<AlbumActionsBarProps>(
    props => <AlbumActionsBar {...props} />,
    {
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
    }
  );
}

describe("AlbumActionsBar Component", () => {
  it("should render without crashing", () => {
    const wrapper = mountAlbumActionsBar();
    waitForComponentToPaint(wrapper);
    expect(wrapper.find("button")).toHaveLength(10);
  });

  it("have Youtube button", () => {
    // given
    global.open = jest.fn();

    const wrapper = mountAlbumActionsBar();
    waitForComponentToPaint(wrapper);
    const chakraButton = wrapper.find("#youtube-button");
    const button = chakraButton.find("button");

    // when
    button.simulate("click");

    // expect
    expect(global.open).toBeCalled();
  });
});
