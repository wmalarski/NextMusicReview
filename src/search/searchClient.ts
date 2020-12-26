import algoliasearch from "algoliasearch";

const ALGOLIA_APP_ID = "5APVQHY9GK";
const ALGOLIA_APP_KEY = "eca2e2cd55458dc4e79b1d41d417d150";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY);

export default searchClient;
