import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  name: Scalars['String'];
  url: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  bookmarks?: Maybe<Array<Bookmark>>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  email: Scalars['String'];
};

export type GetBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks?: Maybe<Array<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'name' | 'url' | 'color'>
  )>> }
);


export const GetBookmarksDocument = gql`
    query getBookmarks {
  bookmarks {
    name
    url
    color
  }
}
    `;

/**
 * __useGetBookmarksQuery__
 *
 * To run a query within a Vue component, call `useGetBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBookmarksQuery();
 */
export function useGetBookmarksQuery(options: VueApolloComposable.UseQueryOptions<GetBookmarksQuery, GetBookmarksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBookmarksQuery, GetBookmarksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBookmarksQuery, GetBookmarksQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetBookmarksQuery, GetBookmarksQueryVariables>(GetBookmarksDocument, {}, options);
}
export type GetBookmarksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetBookmarksQuery, GetBookmarksQueryVariables>;