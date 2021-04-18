import { graphql } from "msw";
import { setupServer } from "msw/node";
import {
  RandomAlbumsQuery,
  RandomAlbumsQueryVariables
} from "../../graphql/types";
import { albumGridItemDefault } from "../../mocks/defaults";

export default setupServer(
  graphql.query<RandomAlbumsQuery, RandomAlbumsQueryVariables>(
    "RandomAlbums",
    (_req, res, ctx) => {
      const counter = Number(sessionStorage.getItem("queryCounter") ?? "0");
      sessionStorage.setItem("queryCounter", String(counter + 1));

      return res(
        ctx.data({
          randomAlbums: [
            {
              ...albumGridItemDefault,
              id: `${counter}`,
              name: `Album${counter}`
            }
          ]
        })
      );
    }
  )
);
