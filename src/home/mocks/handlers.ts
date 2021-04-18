import { graphql } from "msw";
import { albumGridItemDefault } from "../../graphql/mocks/defaults";
import {
  RandomAlbumsQuery,
  RandomAlbumsQueryVariables
} from "../../graphql/types";

export default [
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
];
