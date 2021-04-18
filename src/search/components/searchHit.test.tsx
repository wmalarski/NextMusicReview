import { UserProvider } from "@auth0/nextjs-auth0";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import SearchHit, { AlbumHitProps } from "./searchHit";

function renderSearchHit(props: Partial<AlbumHitProps> = {}) {
  const defaultProps: AlbumHitProps = {
    hit: {
      id: "aId",
      name: "albumName",
      objectID: "objectId",
      performer: "performerName",
      performerId: "performerId",
      year: 1999,
      imageUrl: "imageUrl"
    }
  };
  return render(
    <UserProvider>
      <SearchHit {...{ ...defaultProps, ...props }} />
    </UserProvider>
  );
}

describe("<SearchHit />", () => {
  test("should be visible", async () => {
    const { findByText } = renderSearchHit();

    expect(await findByText("albumName")).toBeInTheDocument();
    expect(await findByText("performerName")).toBeInTheDocument();
    expect(await findByText("1999")).toBeInTheDocument();
  });
});
