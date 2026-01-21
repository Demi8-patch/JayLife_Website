/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type ProductMetafieldsFragment = {
  metafields: Array<
    StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>>
  >;
};

export type GetProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GetProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'description'> & {
      priceRange: { minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
      featuredImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
      metafields: Array<
        StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>>
      >;
    }
  >;
};

export type GetProductsQueryVariables = StorefrontAPI.Exact<{
  first: StorefrontAPI.Scalars['Int']['input'];
}>;

export type GetProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'description'> & {
        priceRange: { minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        featuredImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
        metafields: Array<
          StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>>
        >;
      }
    >;
  };
};

export type GetRitualsProductsQueryVariables = StorefrontAPI.Exact<{
  first: StorefrontAPI.Scalars['Int']['input'];
}>;

export type GetRitualsProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'description'> & {
        priceRange: { minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        featuredImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
        metafields: Array<
          StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>>
        >;
      }
    >;
  };
};

interface GeneratedQueryTypes {
  '#graphql\n  #graphql\n  fragment ProductMetafields on Product {\n    metafields(identifiers: [\n      {namespace: "custom", key: "brand_color"},\n      {namespace: "custom", key: "accent_color"},\n      {namespace: "custom", key: "benefits"},\n      {namespace: "custom", key: "ingredients"},\n      {namespace: "custom", key: "badges"}\n    ]) {\n      namespace\n      key\n      value\n      type\n    }\n  }\n\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      handle\n      title\n      description\n      priceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      featuredImage {\n        url\n        altText\n      }\n      ...ProductMetafields\n    }\n  }\n': {
    return: GetProductQuery;
    variables: GetProductQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment ProductMetafields on Product {\n    metafields(identifiers: [\n      {namespace: "custom", key: "brand_color"},\n      {namespace: "custom", key: "accent_color"},\n      {namespace: "custom", key: "benefits"},\n      {namespace: "custom", key: "ingredients"},\n      {namespace: "custom", key: "badges"}\n    ]) {\n      namespace\n      key\n      value\n      type\n    }\n  }\n\n  query GetProducts($first: Int!) {\n    products(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        priceRange {\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        featuredImage {\n          url\n          altText\n        }\n        ...ProductMetafields\n      }\n    }\n  }\n': {
    return: GetProductsQuery;
    variables: GetProductsQueryVariables;
  };
  '#graphql\n    query GetRitualsProducts($first: Int!) {\n      products(first: $first) {\n        nodes {\n          id\n          handle\n          title\n          description\n          priceRange {\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          featuredImage {\n            url\n            altText\n          }\n          metafields(identifiers: [\n            {namespace: "custom", key: "brand_color"},\n            {namespace: "custom", key: "accent_color"},\n            {namespace: "custom", key: "benefits"},\n            {namespace: "custom", key: "ingredients"},\n            {namespace: "custom", key: "badges"}\n          ]) {\n            namespace\n            key\n            value\n            type\n          }\n        }\n      }\n    }\n  ': {
    return: GetRitualsProductsQuery;
    variables: GetRitualsProductsQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
