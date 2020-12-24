import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
};

export type Query = {
  node?: Maybe<Node>;
  performers?: Maybe<PerformerConnection>;
  performer: Performer;
  albums?: Maybe<AlbumConnection>;
  randomAlbums: Array<Album>;
  myRandomAlbums: Array<Album>;
  album: Album;
  reviews?: Maybe<ReviewConnection>;
  review: Review;
  searchAlbums?: Maybe<Array<AlbumSearch>>;
  searchPerformers?: Maybe<Array<PerformerSearch>>;
  performerCorrection?: Maybe<PerformerCorrection>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPerformersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PerformerFilterInput>;
  order?: Maybe<Array<PerformerSortInput>>;
};


export type QueryPerformerArgs = {
  id: Scalars['ID'];
};


export type QueryAlbumsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<AlbumFilterInput>;
  order?: Maybe<Array<AlbumSortInput>>;
};


export type QueryRandomAlbumsArgs = {
  count: Scalars['Int'];
  where?: Maybe<AlbumFilterInput>;
  order?: Maybe<Array<AlbumSortInput>>;
};


export type QueryMyRandomAlbumsArgs = {
  count: Scalars['Int'];
  where?: Maybe<AlbumFilterInput>;
  order?: Maybe<Array<AlbumSortInput>>;
};


export type QueryAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryReviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReviewFilterInput>;
  order?: Maybe<Array<ReviewSortInput>>;
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};


export type QuerySearchAlbumsArgs = {
  input: SearchAlbumsInput;
};


export type QuerySearchPerformersArgs = {
  input: SearchPerformerInput;
};


export type QueryPerformerCorrectionArgs = {
  input: PerformerCorrectionInput;
};

export type Mutation = {
  createPerformer: CreatePerformerPayload;
  updatePerformer: UpdatePerformerPayload;
  deletePerformer: DeletePayload;
  createAlbum: CreateAlbumPayload;
  updateAlbum: UpdateAlbumPayload;
  deleteAlbum: DeletePayload;
  createReview: CreateReviewPayload;
  updateReview: UpdateReviewPayload;
  deleteReview: DeletePayload;
};


export type MutationCreatePerformerArgs = {
  input: CreatePerformerInput;
};


export type MutationUpdatePerformerArgs = {
  input: UpdatePerformerInput;
};


export type MutationDeletePerformerArgs = {
  input: DeletePerformerInput;
};


export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput;
};


export type MutationUpdateAlbumArgs = {
  input: UpdateAlbumInput;
};


export type MutationDeleteAlbumArgs = {
  input: DeleteAlbumInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationDeleteReviewArgs = {
  input: DeleteReviewInput;
};

export type Performer = Node & {
  id: Scalars['ID'];
  user?: Maybe<User>;
  albums?: Maybe<AlbumConnection>;
  details?: Maybe<PerformerDetails>;
  mBid: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PerformerAlbumsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<AlbumFilterInput>;
  order?: Maybe<Array<AlbumSortInput>>;
};

export type Album = Node & {
  id: Scalars['ID'];
  user?: Maybe<User>;
  performer?: Maybe<Performer>;
  reviews?: Maybe<ReviewConnection>;
  reviewsCount: Scalars['Int'];
  details?: Maybe<AlbumDetails>;
  mBid: Scalars['String'];
  name: Scalars['String'];
  year: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type AlbumReviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReviewFilterInput>;
  order?: Maybe<Array<ReviewSortInput>>;
};

export type Review = Node & {
  id: Scalars['ID'];
  user?: Maybe<User>;
  album?: Maybe<Album>;
  text: Scalars['String'];
  rating: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  performers?: Maybe<Array<Maybe<Performer>>>;
  albums?: Maybe<Array<Maybe<Album>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  id: Scalars['String'];
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
};

export type AlbumFilterInput = {
  and?: Maybe<Array<AlbumFilterInput>>;
  or?: Maybe<Array<AlbumFilterInput>>;
  name?: Maybe<StringOperationFilterInput>;
  year?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type AlbumSortInput = {
  id?: Maybe<SortEnumType>;
  mBid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  performer?: Maybe<SortEnumType>;
  year?: Maybe<SortEnumType>;
  user?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type AlbumConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<AlbumEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Album>>;
};

export type ReviewFilterInput = {
  and?: Maybe<Array<ReviewFilterInput>>;
  or?: Maybe<Array<ReviewFilterInput>>;
  id?: Maybe<StringOperationFilterInput>;
  album?: Maybe<StringOperationFilterInput>;
  text?: Maybe<StringOperationFilterInput>;
  rating?: Maybe<ComparableDecimalOperationFilterInput>;
  user?: Maybe<StringOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type ReviewSortInput = {
  id?: Maybe<SortEnumType>;
  album?: Maybe<SortEnumType>;
  text?: Maybe<SortEnumType>;
  rating?: Maybe<SortEnumType>;
  user?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ReviewConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ReviewEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Review>>;
};

export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>;
  or?: Maybe<Array<StringOperationFilterInput>>;
  eq?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  ncontains?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  startsWith?: Maybe<Scalars['String']>;
  nstartsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  nendsWith?: Maybe<Scalars['String']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: Maybe<Scalars['Int']>;
  neq?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  nin?: Maybe<Array<Scalars['Int']>>;
  gt?: Maybe<Scalars['Int']>;
  ngt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  ngte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  nlt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  nlte?: Maybe<Scalars['Int']>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  nin?: Maybe<Array<Scalars['DateTime']>>;
  gt?: Maybe<Scalars['DateTime']>;
  ngt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  ngte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  nlt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  nlte?: Maybe<Scalars['DateTime']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type AlbumEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Album;
};

export type ComparableDecimalOperationFilterInput = {
  eq?: Maybe<Scalars['Decimal']>;
  neq?: Maybe<Scalars['Decimal']>;
  in?: Maybe<Array<Scalars['Decimal']>>;
  nin?: Maybe<Array<Scalars['Decimal']>>;
  gt?: Maybe<Scalars['Decimal']>;
  ngt?: Maybe<Scalars['Decimal']>;
  gte?: Maybe<Scalars['Decimal']>;
  ngte?: Maybe<Scalars['Decimal']>;
  lt?: Maybe<Scalars['Decimal']>;
  nlt?: Maybe<Scalars['Decimal']>;
  lte?: Maybe<Scalars['Decimal']>;
  nlte?: Maybe<Scalars['Decimal']>;
};

/** An edge in a connection. */
export type ReviewEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Review;
};

export type PerformerDetails = {
  mBid: Scalars['String'];
  image: Array<Image>;
  bio?: Maybe<Wiki>;
  tags?: Maybe<Tags>;
};


export type AlbumDetails = {
  mBid: Scalars['String'];
  image: Array<Image>;
  wiki?: Maybe<Wiki>;
  tags?: Maybe<Tags>;
};


export type PerformerFilterInput = {
  and?: Maybe<Array<PerformerFilterInput>>;
  or?: Maybe<Array<PerformerFilterInput>>;
  id?: Maybe<StringOperationFilterInput>;
  mBid?: Maybe<StringOperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  user?: Maybe<StringOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type PerformerSortInput = {
  id?: Maybe<SortEnumType>;
  mBid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  user?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type PerformerConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<PerformerEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Performer>>;
};

/** An edge in a connection. */
export type PerformerEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Performer;
};

export type CreateAlbumPayload = {
  album?: Maybe<Album>;
  errors?: Maybe<Array<UserError>>;
};

export type DeletePerformerInput = {
  id: Scalars['ID'];
};

export type UpdatePerformerInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreatePerformerInput = {
  mBid: Scalars['String'];
  name: Scalars['String'];
  albums: Array<CreatePerformerAlbumInput>;
};

export type DeletePayload = {
  success: Scalars['Boolean'];
  errors?: Maybe<Array<UserError>>;
};

export type UpdatePerformerPayload = {
  performer?: Maybe<Performer>;
  errors?: Maybe<Array<UserError>>;
};

export type CreatePerformerPayload = {
  performer?: Maybe<Performer>;
  errors?: Maybe<Array<UserError>>;
};

export type PerformerCorrectionInput = {
  performer: Scalars['String'];
};

export type SearchPerformerInput = {
  performer: Scalars['String'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type SearchAlbumsInput = {
  album: Scalars['String'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type PerformerCorrection = {
  name?: Maybe<Scalars['String']>;
  mbid?: Maybe<Scalars['String']>;
};

export type PerformerSearch = {
  name: Scalars['String'];
  image: Array<Image>;
  mbid?: Maybe<Scalars['String']>;
};

export type AlbumSearch = {
  name: Scalars['String'];
  performer: Scalars['String'];
  image: Array<Image>;
  mbid?: Maybe<Scalars['String']>;
};

export type UpdateAlbumPayload = {
  album?: Maybe<Album>;
  errors?: Maybe<Array<UserError>>;
};

export type CreateAlbumInput = {
  mBid: Scalars['String'];
  name: Scalars['String'];
  performer: Scalars['ID'];
  year: Scalars['Int'];
};

export type UpdateAlbumInput = {
  id: Scalars['ID'];
  mBid: Scalars['String'];
  name: Scalars['String'];
  performer: Scalars['ID'];
  year: Scalars['Int'];
};

export type DeleteAlbumInput = {
  id: Scalars['ID'];
};

export type CreateReviewPayload = {
  review?: Maybe<Review>;
  errors?: Maybe<Array<UserError>>;
};

export type UpdateReviewPayload = {
  review?: Maybe<Review>;
  errors?: Maybe<Array<UserError>>;
};

export type CreateReviewInput = {
  album: Scalars['ID'];
  rating: Scalars['Decimal'];
  text: Scalars['String'];
};

export type UpdateReviewInput = {
  id: Scalars['ID'];
  text: Scalars['String'];
  rating: Scalars['Decimal'];
};

export type DeleteReviewInput = {
  id: Scalars['ID'];
};

export type Image = {
  url?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type Wiki = {
  published?: Maybe<Scalars['String']>;
  summary: Scalars['String'];
  content: Scalars['String'];
};

export type Tags = {
  tag: Array<Tag>;
};

export type Tag = {
  name: Scalars['String'];
};

export type CreatePerformerAlbumInput = {
  mBid: Scalars['String'];
  name: Scalars['String'];
  year: Scalars['Int'];
  reviews?: Maybe<Array<CreatePerformerReviewInput>>;
};

export type UserError = {
  message: Scalars['String'];
  code: Scalars['String'];
};

export type CreatePerformerReviewInput = {
  text: Scalars['String'];
  rating: Scalars['Decimal'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type AlbumDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AlbumDetailsQuery = { album: { details?: Maybe<{ wiki?: Maybe<Pick<Wiki, 'content' | 'published' | 'summary'>> }> } };

export type AlbumGridItemFragment = (
  Pick<Album, 'id' | 'name' | 'year'>
  & { performer?: Maybe<Pick<Performer, 'id' | 'name'>>, details?: Maybe<{ image: Array<Pick<Image, 'size' | 'url'>> }> }
);

export type AlbumReviewsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AlbumReviewsQuery = { album: (
    { reviews?: Maybe<{ nodes?: Maybe<Array<ReviewListItemFragment>> }> }
    & AlbumGridItemFragment
  ) };

export type RandomAlbumsQueryVariables = Exact<{
  count: Scalars['Int'];
}>;


export type RandomAlbumsQuery = { randomAlbums: Array<AlbumGridItemFragment> };

export type PerformerDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PerformerDetailsQuery = { performer: (
    Pick<Performer, 'id' | 'name'>
    & { albums?: Maybe<{ nodes?: Maybe<Array<AlbumGridItemFragment>> }>, details?: Maybe<{ bio?: Maybe<Pick<Wiki, 'content' | 'published' | 'summary'>> }> }
  ) };

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = { createReview: { review?: Maybe<ReviewListItemFragment> } };

export type ReviewListItemFragment = Pick<Review, 'id' | 'rating' | 'text' | 'updatedAt' | 'createdAt'>;

export type ReviewsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<ReviewSortInput>>;
}>;


export type ReviewsQuery = { reviews?: Maybe<{ pageInfo: Pick<PageInfo, 'endCursor' | 'hasNextPage'>, nodes?: Maybe<Array<(
      { album?: Maybe<AlbumGridItemFragment> }
      & ReviewListItemFragment
    )>> }> };

export const AlbumGridItemFragmentDoc = `
    fragment AlbumGridItem on Album {
  id
  name
  performer {
    id
    name
  }
  year
  details {
    image {
      size
      url
    }
  }
}
    `;
export const ReviewListItemFragmentDoc = `
    fragment ReviewListItem on Review {
  id
  rating
  text
  updatedAt
  createdAt
}
    `;
export const AlbumDetailsDocument = `
    query AlbumDetails($id: ID!) {
  album(id: $id) {
    details {
      wiki {
        content
        published
        summary
      }
    }
  }
}
    `;
export const useAlbumDetailsQuery = (variables: AlbumDetailsQueryVariables, options?: UseQueryOptions<AlbumDetailsQuery>) => 
  useQuery<AlbumDetailsQuery>(
    ['AlbumDetails', variables],
    fetcher<AlbumDetailsQuery, AlbumDetailsQueryVariables>(AlbumDetailsDocument, variables),
    options
  );
export const AlbumReviewsDocument = `
    query AlbumReviews($id: ID!) {
  album(id: $id) {
    ...AlbumGridItem
    reviews {
      nodes {
        ...ReviewListItem
      }
    }
  }
}
    ${AlbumGridItemFragmentDoc}
${ReviewListItemFragmentDoc}`;
export const useAlbumReviewsQuery = (variables: AlbumReviewsQueryVariables, options?: UseQueryOptions<AlbumReviewsQuery>) => 
  useQuery<AlbumReviewsQuery>(
    ['AlbumReviews', variables],
    fetcher<AlbumReviewsQuery, AlbumReviewsQueryVariables>(AlbumReviewsDocument, variables),
    options
  );
export const RandomAlbumsDocument = `
    query RandomAlbums($count: Int!) {
  randomAlbums(count: $count) {
    ...AlbumGridItem
  }
}
    ${AlbumGridItemFragmentDoc}`;
export const useRandomAlbumsQuery = (variables: RandomAlbumsQueryVariables, options?: UseQueryOptions<RandomAlbumsQuery>) => 
  useQuery<RandomAlbumsQuery>(
    ['RandomAlbums', variables],
    fetcher<RandomAlbumsQuery, RandomAlbumsQueryVariables>(RandomAlbumsDocument, variables),
    options
  );
export const PerformerDetailsDocument = `
    query PerformerDetails($id: ID!) {
  performer(id: $id) {
    id
    name
    albums {
      nodes {
        ...AlbumGridItem
      }
    }
    details {
      bio {
        content
        published
        summary
      }
    }
  }
}
    ${AlbumGridItemFragmentDoc}`;
export const usePerformerDetailsQuery = (variables: PerformerDetailsQueryVariables, options?: UseQueryOptions<PerformerDetailsQuery>) => 
  useQuery<PerformerDetailsQuery>(
    ['PerformerDetails', variables],
    fetcher<PerformerDetailsQuery, PerformerDetailsQueryVariables>(PerformerDetailsDocument, variables),
    options
  );
export const CreateReviewDocument = `
    mutation CreateReview($input: CreateReviewInput!) {
  createReview(input: $input) {
    review {
      ...ReviewListItem
    }
  }
}
    ${ReviewListItemFragmentDoc}`;
export const useCreateReviewMutation = (variables: CreateReviewMutationVariables, options?: UseMutationOptions<CreateReviewMutation, unknown, CreateReviewMutationVariables>) => 
    useMutation<CreateReviewMutation, unknown, CreateReviewMutationVariables>(
    fetcher<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, variables),
    options
  );
export const ReviewsDocument = `
    query Reviews($after: String, $first: Int, $order: [ReviewSortInput!]) {
  reviews(after: $after, first: $first, order: $order) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      ...ReviewListItem
      album {
        ...AlbumGridItem
      }
    }
  }
}
    ${ReviewListItemFragmentDoc}
${AlbumGridItemFragmentDoc}`;
export const useReviewsQuery = (variables?: ReviewsQueryVariables, options?: UseQueryOptions<ReviewsQuery>) => 
  useQuery<ReviewsQuery>(
    ['Reviews', variables],
    fetcher<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, variables),
    options
  );