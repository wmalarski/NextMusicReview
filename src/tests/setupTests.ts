import "@testing-library/jest-dom";
import server from "../graphql/mocks/mockServer";
import queryClient from "../graphql/queryClient";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
  queryClient.clear();
});
afterAll(() => server.close());
