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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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

export type Mutation = {
  __typename?: 'Mutation';
  newBookmark: Bookmark;
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
};


export type MutationNewBookmarkArgs = {
  name: Scalars['String'];
  url: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  )> }
);

export type NewBookmarkMutationVariables = Exact<{
  name: Scalars['String'];
  url: Scalars['String'];
  color?: Maybe<Scalars['String']>;
}>;


export type NewBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { newBookmark: (
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'name' | 'url' | 'color'>
  ) }
);

export type GetBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks?: Maybe<Array<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'name' | 'url' | 'color'>
  )>> }
);


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const NewBookmarkDocument = gql`
    mutation newBookmark($name: String!, $url: String!, $color: String) {
  newBookmark(name: $name, url: $url, color: $color) {
    name
    url
    color
  }
}
    `;

/**
 * __useNewBookmarkMutation__
 *
 * To run a mutation, you first call `useNewBookmarkMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useNewBookmarkMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useNewBookmarkMutation({
 *   variables: {
 *     name: // value for 'name'
 *     url: // value for 'url'
 *     color: // value for 'color'
 *   },
 * });
 */
export function useNewBookmarkMutation(options: VueApolloComposable.UseMutationOptions<NewBookmarkMutation, NewBookmarkMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<NewBookmarkMutation, NewBookmarkMutationVariables>>) {
  return VueApolloComposable.useMutation<NewBookmarkMutation, NewBookmarkMutationVariables>(NewBookmarkDocument, options);
}
export type NewBookmarkMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<NewBookmarkMutation, NewBookmarkMutationVariables>;
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