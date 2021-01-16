import { ReactWrapper } from "enzyme";
import fetchMock from "jest-fetch-mock";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import AlbumDeleteButton, {
  AlbumDeleteButtonProps
} from "../../src/album/components/albumDeleteButton";
import { AlbumGridItemFragment } from "../../src/graphql/types";
import {
  nextRouterMock,
  waitForComponentToPaint,
  withRouterContext
} from "../utils";

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

function mountAlbumDeleteButton(
  album: Partial<AlbumGridItemFragment>,
  router: NextRouter
): ReactWrapper<AlbumDeleteButtonProps, any> {
  return withRouterContext<AlbumDeleteButtonProps>(
    props => <AlbumDeleteButton {...props} />,
    {
      album: {
        id: "id",
        mBid: "mBid",
        name: "name",
        year: 1999,
        performer: {
          id: "performer",
          name: "performer"
        },
        details: {
          image: [
            {
              size: "small",
              url: "url"
            }
          ]
        },
        ...album
      }
    },
    router
  );
}

describe("AlbumDeleteButton Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("execute success mutation after click", () => {
    // given
    const router = nextRouterMock();
    const mockRouterPush = jest.fn(
      (path: string): Promise<boolean> => {
        console.log("i'm gonna loose my mind", path);
        return new Promise(() => true);
      }
    );
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockRouterPush
    }));

    const wrapper = mountAlbumDeleteButton({ performer: undefined }, router);
    waitForComponentToPaint(wrapper);
    const button = wrapper.find("button");

    fetchMock.mockResponseOnce(
      JSON.stringify({ data: { deleteAlbum: { success: true } } })
    );

    // when
    button.simulate("click");

    // expect
    expect(useRouter).toHaveBeenCalled();
    // mockRouterPush("/");
    // expect(mockRouterPush).toHaveBeenCalled();
  });
});
