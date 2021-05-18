import React from "react";
import Layout from "../common/components/Layout/Layout";

export default function SearchPage(): JSX.Element {
  return (
    <Layout container>
      <p>Algolia Search</p>
      {/* <InstantSearch searchClient={searchClient} indexName="dev_reviews">
        <Stack>
          <Configure />
          <SearchBox />
          <PoweredBy />
          <RefinementList attribute="categories" />
          <Hits hitComponent={SearchHit} />
          <Pagination />
        </Stack>
      </InstantSearch> */}
    </Layout>
  );
}
