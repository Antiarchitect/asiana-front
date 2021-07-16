import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type Query = {
  __typename?: 'Query';
  carts?: Maybe<Array<Maybe<CartType>>>;
  products?: Maybe<Array<Maybe<ProductType>>>;
  regions?: Maybe<Array<Maybe<RegionType>>>;
  contacts?: Maybe<Array<Maybe<ContactType>>>;
  autoServices?: Maybe<Array<Maybe<AutoServiceType>>>;
  whoami?: Maybe<UserType>;
  users?: Maybe<Array<Maybe<UserType>>>;
  actions?: Maybe<Array<Maybe<ActionType>>>;
  news?: Maybe<Array<Maybe<NewsType>>>;
  profiles?: Maybe<Array<Maybe<ProfileType>>>;
};

export type QueryCartsArgs = {
  cartId?: Maybe<Scalars['Int']>;
};

export type QueryProductsArgs = {
  productId?: Maybe<Scalars['Int']>;
};

export type QueryRegionsArgs = {
  regionId?: Maybe<Scalars['Int']>;
};

export type QueryContactsArgs = {
  contactId?: Maybe<Scalars['Int']>;
  blockId?: Maybe<Scalars['Int']>;
};

export type QueryAutoServicesArgs = {
  autoServiceId?: Maybe<Scalars['Int']>;
};

export type QueryActionsArgs = {
  actionId?: Maybe<Scalars['Int']>;
};

export type QueryNewsArgs = {
  newsId?: Maybe<Scalars['Int']>;
};

export type QueryProfilesArgs = {
  profileId?: Maybe<Scalars['Int']>;
};

export type CartType = {
  __typename?: 'CartType';
  id: Scalars['ID'];
  user: UserType;
  product: ProductType;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  profile?: Maybe<UserProfile>;
  cartSet: Array<CartType>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['ID'];
  user: UserType;
  role: ProfileRole;
};

/** An enumeration. */
export enum ProfileRole {
  /** user */
  USER = 'USER',
  /** manager */
  MANAGER = 'MANAGER',
}

export type ProductType = {
  __typename?: 'ProductType';
  id: Scalars['ID'];
  title: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  brand: Scalars['String'];
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  cartSet: Array<CartType>;
};

export type RegionType = {
  __typename?: 'RegionType';
  id: Scalars['ID'];
  name: Scalars['String'];
  blockId: Scalars['Int'];
};

export type ContactType = {
  __typename?: 'ContactType';
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  address: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  workTime: Scalars['String'];
  phone: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  coordinates: Scalars['String'];
};

export type AutoServiceType = {
  __typename?: 'AutoServiceType';
  id: Scalars['ID'];
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  workTime?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Scalars['String']>;
};

export type ActionType = {
  __typename?: 'ActionType';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  title: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
};

export type NewsType = {
  __typename?: 'NewsType';
  id: Scalars['ID'];
  title: Scalars['String'];
  preview: Scalars['String'];
  content: Scalars['String'];
  dateCreated?: Maybe<Scalars['DateTime']>;
  showMain?: Maybe<Scalars['Int']>;
};

export type ProfileType = {
  __typename?: 'ProfileType';
  id: Scalars['ID'];
  surname: Scalars['String'];
  name: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  city: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCarts?: Maybe<CreateCart>;
  createProducts?: Maybe<CreateProduct>;
  createAutoservices?: Maybe<CreateAutoService>;
  createUser?: Maybe<CreateUser>;
  createProfile?: Maybe<CreateProfile>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
  refreshToken?: Maybe<Refresh>;
};

export type MutationCreateCartsArgs = {
  input: CartInput;
};

export type MutationCreateProductsArgs = {
  input: ProductInput;
};

export type MutationCreateAutoservicesArgs = {
  input: AutoServiceInput;
};

export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationCreateProfileArgs = {
  input: ProfileInput;
};

export type MutationTokenAuthArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};

export type CreateCart = {
  __typename?: 'CreateCart';
  ok?: Maybe<Scalars['Boolean']>;
  cart?: Maybe<CartType>;
};

export type CartInput = {
  userId?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['Int']>;
};

export type CreateProduct = {
  __typename?: 'CreateProduct';
  ok?: Maybe<Scalars['Boolean']>;
  product?: Maybe<ProductType>;
};

export type ProductInput = {
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
};

export type CreateAutoService = {
  __typename?: 'CreateAutoService';
  ok?: Maybe<Scalars['Boolean']>;
  autoService?: Maybe<AutoServiceType>;
};

export type AutoServiceInput = {
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  workTime?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Scalars['String']>;
};

export type CreateUser = {
  __typename?: 'CreateUser';
  user?: Maybe<UserType>;
  profile?: Maybe<UserProfile>;
  token?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type CreateProfile = {
  __typename?: 'CreateProfile';
  ok?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<ProfileType>;
};

export type ProfileInput = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
};

export type Verify = {
  __typename?: 'Verify';
  payload?: Maybe<Scalars['GenericScalar']>;
};

export type Refresh = {
  __typename?: 'Refresh';
  token?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
};

export type ActionFragment = { __typename?: 'ActionType' } & Pick<
  ActionType,
  'id' | 'date' | 'title' | 'image' | 'body' | 'status'
>;

export type ContactFragment = { __typename?: 'ContactType' } & Pick<
  ContactType,
  | 'id'
  | 'image'
  | 'type'
  | 'address'
  | 'city'
  | 'workTime'
  | 'phone'
  | 'email'
  | 'coordinates'
>;

export type NewsFragment = { __typename?: 'NewsType' } & Pick<
  NewsType,
  'id' | 'title' | 'preview' | 'content' | 'dateCreated' | 'showMain'
>;

export type ProductFragment = { __typename?: 'ProductType' } & Pick<
  ProductType,
  'id' | 'title' | 'image' | 'description' | 'brand' | 'quantity' | 'price'
>;

export type ProfileFragment = { __typename?: 'UserProfile' } & Pick<
  UserProfile,
  'id' | 'role'
> & { user: { __typename?: 'UserType' } & UserFragment };

export type UserFragment = { __typename?: 'UserType' } & Pick<
  UserType,
  | 'id'
  | 'password'
  | 'lastLogin'
  | 'isSuperuser'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'isStaff'
  | 'isActive'
  | 'dateJoined'
>;

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser?: Maybe<
    { __typename?: 'CreateUser' } & Pick<
      CreateUser,
      'token' | 'refreshToken'
    > & {
        user?: Maybe<{ __typename?: 'UserType' } & UserFragment>;
        profile?: Maybe<{ __typename?: 'UserProfile' } & ProfileFragment>;
      }
  >;
};

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type RefreshTokenMutation = { __typename?: 'Mutation' } & {
  refreshToken?: Maybe<
    { __typename?: 'Refresh' } & Pick<Refresh, 'payload' | 'token'>
  >;
};

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type TokenAuthMutation = { __typename?: 'Mutation' } & {
  tokenAuth?: Maybe<
    { __typename?: 'ObtainJSONWebToken' } & Pick<ObtainJsonWebToken, 'token'>
  >;
};

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type VerifyTokenMutation = { __typename?: 'Mutation' } & {
  verifyToken?: Maybe<{ __typename?: 'Verify' } & Pick<Verify, 'payload'>>;
};

export type ActionsQueryVariables = Exact<{ [key: string]: never }>;

export type ActionsQuery = { __typename?: 'Query' } & {
  actions?: Maybe<Array<Maybe<{ __typename?: 'ActionType' } & ActionFragment>>>;
};

export type ContactsQueryVariables = Exact<{
  contactId?: Maybe<Scalars['Int']>;
  blockId?: Maybe<Scalars['Int']>;
}>;

export type ContactsQuery = { __typename?: 'Query' } & {
  contacts?: Maybe<
    Array<Maybe<{ __typename?: 'ContactType' } & ContactFragment>>
  >;
};

export type NewsQueryVariables = Exact<{ [key: string]: never }>;

export type NewsQuery = { __typename?: 'Query' } & {
  news?: Maybe<Array<Maybe<{ __typename?: 'NewsType' } & NewsFragment>>>;
};

export type ProductsQueryVariables = Exact<{
  productId?: Maybe<Scalars['Int']>;
}>;

export type ProductsQuery = { __typename?: 'Query' } & {
  products?: Maybe<
    Array<Maybe<{ __typename?: 'ProductType' } & ProductFragment>>
  >;
};

export type RegionsQueryVariables = Exact<{ [key: string]: never }>;

export type RegionsQuery = { __typename?: 'Query' } & {
  regions?: Maybe<
    Array<
      Maybe<
        { __typename?: 'RegionType' } & Pick<
          RegionType,
          'id' | 'name' | 'blockId'
        >
      >
    >
  >;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & {
  users?: Maybe<Array<Maybe<{ __typename?: 'UserType' } & UserFragment>>>;
};

export const ActionFragmentDoc = gql`
  fragment action on ActionType {
    id
    date
    title
    image
    body
    status
  }
`;
export const ContactFragmentDoc = gql`
  fragment contact on ContactType {
    id
    image
    type
    address
    city
    workTime
    phone
    email
    coordinates
  }
`;
export const NewsFragmentDoc = gql`
  fragment news on NewsType {
    id
    title
    preview
    content
    dateCreated
    showMain
  }
`;
export const ProductFragmentDoc = gql`
  fragment product on ProductType {
    id
    title
    image
    description
    brand
    quantity
    price
  }
`;
export const UserFragmentDoc = gql`
  fragment user on UserType {
    id
    password
    lastLogin
    isSuperuser
    username
    firstName
    lastName
    email
    isStaff
    isActive
    dateJoined
  }
`;
export const ProfileFragmentDoc = gql`
  fragment profile on UserProfile {
    id
    user {
      ...user
    }
    role
  }
  ${UserFragmentDoc}
`;
export const CreateUserDocument = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        ...user
      }
      profile {
        ...profile
      }
      token
      refreshToken
    }
  }
  ${UserFragmentDoc}
  ${ProfileFragmentDoc}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      payload
      token
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const TokenAuthDocument = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
export type TokenAuthMutationFn = Apollo.MutationFunction<
  TokenAuthMutation,
  TokenAuthMutationVariables
>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TokenAuthMutation,
    TokenAuthMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(
    TokenAuthDocument,
    options,
  );
}
export type TokenAuthMutationHookResult = ReturnType<
  typeof useTokenAuthMutation
>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<
  TokenAuthMutation,
  TokenAuthMutationVariables
>;
export const VerifyTokenDocument = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
export type VerifyTokenMutationFn = Apollo.MutationFunction<
  VerifyTokenMutation,
  VerifyTokenMutationVariables
>;

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyTokenMutation,
    VerifyTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(
    VerifyTokenDocument,
    options,
  );
}
export type VerifyTokenMutationHookResult = ReturnType<
  typeof useVerifyTokenMutation
>;
export type VerifyTokenMutationResult =
  Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<
  VerifyTokenMutation,
  VerifyTokenMutationVariables
>;
export const ActionsDocument = gql`
  query actions {
    actions {
      ...action
    }
  }
  ${ActionFragmentDoc}
`;

/**
 * __useActionsQuery__
 *
 * To run a query within a React component, call `useActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ActionsQuery, ActionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ActionsQuery, ActionsQueryVariables>(
    ActionsDocument,
    options,
  );
}
export function useActionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActionsQuery,
    ActionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ActionsQuery, ActionsQueryVariables>(
    ActionsDocument,
    options,
  );
}
export type ActionsQueryHookResult = ReturnType<typeof useActionsQuery>;
export type ActionsLazyQueryHookResult = ReturnType<typeof useActionsLazyQuery>;
export type ActionsQueryResult = Apollo.QueryResult<
  ActionsQuery,
  ActionsQueryVariables
>;
export const ContactsDocument = gql`
  query contacts($contactId: Int, $blockId: Int) {
    contacts(contactId: $contactId, blockId: $blockId) {
      ...contact
    }
  }
  ${ContactFragmentDoc}
`;

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *      contactId: // value for 'contactId'
 *      blockId: // value for 'blockId'
 *   },
 * });
 */
export function useContactsQuery(
  baseOptions?: Apollo.QueryHookOptions<ContactsQuery, ContactsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContactsQuery, ContactsQueryVariables>(
    ContactsDocument,
    options,
  );
}
export function useContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContactsQuery,
    ContactsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContactsQuery, ContactsQueryVariables>(
    ContactsDocument,
    options,
  );
}
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<
  typeof useContactsLazyQuery
>;
export type ContactsQueryResult = Apollo.QueryResult<
  ContactsQuery,
  ContactsQueryVariables
>;
export const NewsDocument = gql`
  query news {
    news {
      ...news
    }
  }
  ${NewsFragmentDoc}
`;

/**
 * __useNewsQuery__
 *
 * To run a query within a React component, call `useNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsQuery(
  baseOptions?: Apollo.QueryHookOptions<NewsQuery, NewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
}
export function useNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NewsQuery, NewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NewsQuery, NewsQueryVariables>(
    NewsDocument,
    options,
  );
}
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>;
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>;
export type NewsQueryResult = Apollo.QueryResult<NewsQuery, NewsQueryVariables>;
export const ProductsDocument = gql`
  query products($productId: Int) {
    products(productId: $productId) {
      ...product
    }
  }
  ${ProductFragmentDoc}
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>;
export const RegionsDocument = gql`
  query regions {
    regions {
      id
      name
      blockId
    }
  }
`;

/**
 * __useRegionsQuery__
 *
 * To run a query within a React component, call `useRegionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRegionsQuery(
  baseOptions?: Apollo.QueryHookOptions<RegionsQuery, RegionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RegionsQuery, RegionsQueryVariables>(
    RegionsDocument,
    options,
  );
}
export function useRegionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RegionsQuery,
    RegionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RegionsQuery, RegionsQueryVariables>(
    RegionsDocument,
    options,
  );
}
export type RegionsQueryHookResult = ReturnType<typeof useRegionsQuery>;
export type RegionsLazyQueryHookResult = ReturnType<typeof useRegionsLazyQuery>;
export type RegionsQueryResult = Apollo.QueryResult<
  RegionsQuery,
  RegionsQueryVariables
>;
export const UsersDocument = gql`
  query users {
    users {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
