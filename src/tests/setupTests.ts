/* eslint-disable jest/require-top-level-describe */
import "@testing-library/jest-dom";
import queryClient from "../graphql/queryClient";
import server from "./mockServer";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());
