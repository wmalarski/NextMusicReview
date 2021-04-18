import { setupServer } from "msw/node";
import albumHandlers from "../../album/mocks/handlers";
import homeHandlers from "../../home/mocks/handlers";
import performerHandlers from "../../performer/mocks/handlers";
import reviewHandlers from "../../review/mocks/handlers";
import searchHandlers from "../../search/mocks/handlers";
import usersHandlers from "../../users/mocks/handlers";

const server = setupServer(
  ...albumHandlers,
  ...homeHandlers,
  ...performerHandlers,
  ...reviewHandlers,
  ...searchHandlers,
  ...usersHandlers
);

export default server;
