import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
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
  readonly node: Maybe<Node>;
  readonly performers: Maybe<PerformerConnection>;
  readonly performer: Performer;
  readonly albums: Maybe<AlbumConnection>;
  readonly randomAlbums: ReadonlyArray<Album>;
  readonly myRandomAlbums: ReadonlyArray<Album>;
  readonly album: Album;
  readonly reviews: Maybe<ReviewConnection>;
  readonly review: Review;
  readonly searchAlbums: Maybe<ReadonlyArray<AlbumSearch>>;
  readonly searchPerformers: Maybe<ReadonlyArray<PerformerSearch>>;
  readonly performerCorrection: Maybe<PerformerCorrection>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPerformersArgs = {
  first: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  where: Maybe<PerformerFilterInput>;
  order: Maybe<ReadonlyArray<PerformerSortInput>>;
};


export type QueryPerformerArgs = {
  id: Scalars['ID'];
};


export type QueryAlbumsArgs = {
  first: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  where: Maybe<AlbumFilterInput>;
  order: Maybe<ReadonlyArray<AlbumSortInput>>;
};


export type QueryRandomAlbumsArgs = {
  count: Scalars['Int'];
  where: Maybe<AlbumFilterInput>;
  order: Maybe<ReadonlyArray<AlbumSortInput>>;
};


export type QueryMyRandomAlbumsArgs = {
  count: Scalars['Int'];
  where: Maybe<AlbumFilterInput>;
  order: Maybe<ReadonlyArray<AlbumSortInput>>;
};


export type QueryAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryReviewsArgs = {
  first: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  where: Maybe<ReviewFilterInput>;
  order: Maybe<ReadonlyArray<ReviewSortInput>>;
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
  readonly createPerformer: CreatePerformerPayload;
  readonly updatePerformer: UpdatePerformerPayload;
  readonly deletePerformer: DeletePayload;
  readonly createAlbum: CreateAlbumPayload;
  readonly updateAlbum: UpdateAlbumPayload;
  readonly deleteAlbum: DeletePayload;
  readonly createReview: CreateReviewPayload;
  readonly updateReview: UpdateReviewPayload;
  readonly deleteReview: DeletePayload;
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
  readonly id: Scalars['ID'];
  readonly user: Maybe<User>;
  readonly albums: Maybe<AlbumConnection>;
  readonly details: Maybe<PerformerDetails>;
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};


export type PerformerAlbumsArgs = {
  first: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  where: Maybe<AlbumFilterInput>;
  order: Maybe<ReadonlyArray<AlbumSortInput>>;
};

export type Album = Node & {
  readonly id: Scalars['ID'];
  readonly user: Maybe<User>;
  readonly performer: Maybe<Performer>;
  readonly reviews: Maybe<ReviewConnection>;
  readonly reviewsCount: Scalars['Int'];
  readonly details: Maybe<AlbumDetails>;
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly year: Scalars['Int'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};


export type AlbumReviewsArgs = {
  first: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  where: Maybe<ReviewFilterInput>;
  order: Maybe<ReadonlyArray<ReviewSortInput>>;
};

export type Review = Node & {
  readonly id: Scalars['ID'];
  readonly user: Maybe<User>;
  readonly album: Maybe<Album>;
  readonly text: Scalars['String'];
  readonly rating: Scalars['Decimal'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};

export type User = {
  readonly performers: Maybe<ReadonlyArray<Maybe<Performer>>>;
  readonly albums: Maybe<ReadonlyArray<Maybe<Album>>>;
  readonly reviews: Maybe<ReadonlyArray<Maybe<Review>>>;
  readonly id: Scalars['String'];
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  readonly id: Scalars['ID'];
};

export type AlbumFilterInput = {
  readonly and: Maybe<ReadonlyArray<AlbumFilterInput>>;
  readonly or: Maybe<ReadonlyArray<AlbumFilterInput>>;
  readonly name: Maybe<StringOperationFilterInput>;
  readonly year: Maybe<ComparableInt32OperationFilterInput>;
  readonly createdAt: Maybe<ComparableDateTimeOperationFilterInput>;
  readonly updatedAt: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type AlbumSortInput = {
  readonly id: Maybe<SortEnumType>;
  readonly mBid: Maybe<SortEnumType>;
  readonly name: Maybe<SortEnumType>;
  readonly performer: Maybe<SortEnumType>;
  readonly year: Maybe<SortEnumType>;
  readonly user: Maybe<SortEnumType>;
  readonly createdAt: Maybe<SortEnumType>;
  readonly updatedAt: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type AlbumConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<AlbumEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Album>>;
};

export type ReviewFilterInput = {
  readonly and: Maybe<ReadonlyArray<ReviewFilterInput>>;
  readonly or: Maybe<ReadonlyArray<ReviewFilterInput>>;
  readonly id: Maybe<StringOperationFilterInput>;
  readonly album: Maybe<StringOperationFilterInput>;
  readonly text: Maybe<StringOperationFilterInput>;
  readonly rating: Maybe<ComparableDecimalOperationFilterInput>;
  readonly user: Maybe<StringOperationFilterInput>;
  readonly createdAt: Maybe<ComparableDateTimeOperationFilterInput>;
  readonly updatedAt: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type ReviewSortInput = {
  readonly id: Maybe<SortEnumType>;
  readonly album: Maybe<SortEnumType>;
  readonly text: Maybe<SortEnumType>;
  readonly rating: Maybe<SortEnumType>;
  readonly user: Maybe<SortEnumType>;
  readonly createdAt: Maybe<SortEnumType>;
  readonly updatedAt: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ReviewConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ReviewEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Review>>;
};

export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type StringOperationFilterInput = {
  readonly and: Maybe<ReadonlyArray<StringOperationFilterInput>>;
  readonly or: Maybe<ReadonlyArray<StringOperationFilterInput>>;
  readonly eq: Maybe<Scalars['String']>;
  readonly neq: Maybe<Scalars['String']>;
  readonly contains: Maybe<Scalars['String']>;
  readonly ncontains: Maybe<Scalars['String']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly startsWith: Maybe<Scalars['String']>;
  readonly nstartsWith: Maybe<Scalars['String']>;
  readonly endsWith: Maybe<Scalars['String']>;
  readonly nendsWith: Maybe<Scalars['String']>;
};

export type ComparableInt32OperationFilterInput = {
  readonly eq: Maybe<Scalars['Int']>;
  readonly neq: Maybe<Scalars['Int']>;
  readonly in: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly nin: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly gt: Maybe<Scalars['Int']>;
  readonly ngt: Maybe<Scalars['Int']>;
  readonly gte: Maybe<Scalars['Int']>;
  readonly ngte: Maybe<Scalars['Int']>;
  readonly lt: Maybe<Scalars['Int']>;
  readonly nlt: Maybe<Scalars['Int']>;
  readonly lte: Maybe<Scalars['Int']>;
  readonly nlte: Maybe<Scalars['Int']>;
};

export type ComparableDateTimeOperationFilterInput = {
  readonly eq: Maybe<Scalars['DateTime']>;
  readonly neq: Maybe<Scalars['DateTime']>;
  readonly in: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly nin: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly gt: Maybe<Scalars['DateTime']>;
  readonly ngt: Maybe<Scalars['DateTime']>;
  readonly gte: Maybe<Scalars['DateTime']>;
  readonly ngte: Maybe<Scalars['DateTime']>;
  readonly lt: Maybe<Scalars['DateTime']>;
  readonly nlt: Maybe<Scalars['DateTime']>;
  readonly lte: Maybe<Scalars['DateTime']>;
  readonly nlte: Maybe<Scalars['DateTime']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  readonly hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type AlbumEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Album;
};

export type ComparableDecimalOperationFilterInput = {
  readonly eq: Maybe<Scalars['Decimal']>;
  readonly neq: Maybe<Scalars['Decimal']>;
  readonly in: Maybe<ReadonlyArray<Scalars['Decimal']>>;
  readonly nin: Maybe<ReadonlyArray<Scalars['Decimal']>>;
  readonly gt: Maybe<Scalars['Decimal']>;
  readonly ngt: Maybe<Scalars['Decimal']>;
  readonly gte: Maybe<Scalars['Decimal']>;
  readonly ngte: Maybe<Scalars['Decimal']>;
  readonly lt: Maybe<Scalars['Decimal']>;
  readonly nlt: Maybe<Scalars['Decimal']>;
  readonly lte: Maybe<Scalars['Decimal']>;
  readonly nlte: Maybe<Scalars['Decimal']>;
};

/** An edge in a connection. */
export type ReviewEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Review;
};

export type PerformerDetails = {
  readonly mBid: Scalars['String'];
  readonly image: ReadonlyArray<Image>;
  readonly bio: Maybe<Wiki>;
  readonly tags: Maybe<Tags>;
};


export type AlbumDetails = {
  readonly mBid: Scalars['String'];
  readonly image: ReadonlyArray<Image>;
  readonly wiki: Maybe<Wiki>;
  readonly tags: Maybe<Tags>;
};


export type PerformerFilterInput = {
  readonly and: Maybe<ReadonlyArray<PerformerFilterInput>>;
  readonly or: Maybe<ReadonlyArray<PerformerFilterInput>>;
  readonly id: Maybe<StringOperationFilterInput>;
  readonly mBid: Maybe<StringOperationFilterInput>;
  readonly name: Maybe<StringOperationFilterInput>;
  readonly user: Maybe<StringOperationFilterInput>;
  readonly createdAt: Maybe<ComparableDateTimeOperationFilterInput>;
  readonly updatedAt: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type PerformerSortInput = {
  readonly id: Maybe<SortEnumType>;
  readonly mBid: Maybe<SortEnumType>;
  readonly name: Maybe<SortEnumType>;
  readonly user: Maybe<SortEnumType>;
  readonly createdAt: Maybe<SortEnumType>;
  readonly updatedAt: Maybe<SortEnumType>;
};

/** A connection to a list of items. */
export type PerformerConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<PerformerEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Performer>>;
};

/** An edge in a connection. */
export type PerformerEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Performer;
};

export type CreateAlbumPayload = {
  readonly album: Maybe<Album>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type DeletePerformerInput = {
  readonly id: Scalars['ID'];
};

export type UpdatePerformerInput = {
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type CreatePerformerInput = {
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly albums: ReadonlyArray<CreatePerformerAlbumInput>;
};

export type DeletePayload = {
  readonly success: Scalars['Boolean'];
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type UpdatePerformerPayload = {
  readonly performer: Maybe<Performer>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type CreatePerformerPayload = {
  readonly performer: Maybe<Performer>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type PerformerCorrectionInput = {
  readonly performer: Scalars['String'];
};

export type SearchPerformerInput = {
  readonly performer: Scalars['String'];
  readonly page: Scalars['Int'];
  readonly limit: Scalars['Int'];
};

export type SearchAlbumsInput = {
  readonly album: Scalars['String'];
  readonly page: Scalars['Int'];
  readonly limit: Scalars['Int'];
};

export type PerformerCorrection = {
  readonly name: Maybe<Scalars['String']>;
  readonly mbid: Maybe<Scalars['String']>;
};

export type PerformerSearch = {
  readonly name: Scalars['String'];
  readonly image: ReadonlyArray<Image>;
  readonly mbid: Maybe<Scalars['String']>;
};

export type AlbumSearch = {
  readonly name: Scalars['String'];
  readonly performer: Scalars['String'];
  readonly image: ReadonlyArray<Image>;
  readonly mbid: Maybe<Scalars['String']>;
};

export type UpdateAlbumPayload = {
  readonly album: Maybe<Album>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type CreateAlbumInput = {
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly performer: Scalars['ID'];
  readonly year: Scalars['Int'];
};

export type UpdateAlbumInput = {
  readonly id: Scalars['ID'];
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly performer: Scalars['ID'];
  readonly year: Scalars['Int'];
};

export type DeleteAlbumInput = {
  readonly id: Scalars['ID'];
};

export type CreateReviewPayload = {
  readonly review: Maybe<Review>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type UpdateReviewPayload = {
  readonly review: Maybe<Review>;
  readonly errors: Maybe<ReadonlyArray<UserError>>;
};

export type CreateReviewInput = {
  readonly album: Scalars['ID'];
  readonly rating: Scalars['Decimal'];
  readonly text: Scalars['String'];
};

export type UpdateReviewInput = {
  readonly id: Scalars['ID'];
  readonly text: Scalars['String'];
  readonly rating: Scalars['Decimal'];
};

export type DeleteReviewInput = {
  readonly id: Scalars['ID'];
};

export type Image = {
  readonly url: Maybe<Scalars['String']>;
  readonly size: Maybe<Scalars['String']>;
};

export type Wiki = {
  readonly published: Maybe<Scalars['String']>;
  readonly summary: Scalars['String'];
  readonly content: Scalars['String'];
};

export type Tags = {
  readonly tag: ReadonlyArray<Tag>;
};

export type Tag = {
  readonly name: Scalars['String'];
};

export type CreatePerformerAlbumInput = {
  readonly mBid: Scalars['String'];
  readonly name: Scalars['String'];
  readonly year: Scalars['Int'];
  readonly reviews: Maybe<ReadonlyArray<CreatePerformerReviewInput>>;
};

export type UserError = {
  readonly message: Scalars['String'];
  readonly code: Scalars['String'];
};

export type CreatePerformerReviewInput = {
  readonly text: Scalars['String'];
  readonly rating: Scalars['Decimal'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};

export type RandomAlbumsQueryVariables = Exact<{
  count: Scalars['Int'];
}>;


export type RandomAlbumsQuery = { readonly randomAlbums: ReadonlyArray<(
    Pick<Album, 'id' | 'name' | 'year'>
    & { readonly performer: Maybe<Pick<Performer, 'name'>>, readonly details: Maybe<{ readonly image: ReadonlyArray<Pick<Image, 'size' | 'url'>> }> }
  )> };


export const RandomAlbumsDocument = gql`
    query RandomAlbums($count: Int!) {
  randomAlbums(count: $count) {
    id
    name
    performer {
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
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    RandomAlbums(variables: RandomAlbumsQueryVariables): Promise<RandomAlbumsQuery> {
      return withWrapper(() => client.request<RandomAlbumsQuery>(print(RandomAlbumsDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;