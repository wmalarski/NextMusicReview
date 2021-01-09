import { Stack } from "@chakra-ui/react";
import React from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  PoweredBy,
  RefinementList,
  SearchBox
} from "react-instantsearch-dom";
import Layout from "../common/components/layout";
import AlbumHit from "../search/components/searchHit";
import searchClient from "../search/searchClient";

export default function SearchPage(): JSX.Element {
  return (
    <Layout container>
      <InstantSearch searchClient={searchClient} indexName="dev_reviews">
        <Stack>
          <Configure />
          <SearchBox />
          <PoweredBy />
          <RefinementList attribute="categories" />
          <Hits hitComponent={AlbumHit} />
          <Pagination />
        </Stack>
      </InstantSearch>
    </Layout>
  );
}
