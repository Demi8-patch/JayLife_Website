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

export type VariantFieldsFragment = Pick<
  StorefrontAPI.ProductVariant,
  'id' | 'title' | 'availableForSale' | 'quantityAvailable'
> & {
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
  image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>>;
};

export type GetCollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type GetCollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, 'id' | 'handle' | 'title' | 'description'> & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title' | 'description' | 'availableForSale'
          > & {
            priceRange: {
              minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            };
            compareAtPriceRange: {
              minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            };
            featuredImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
            images: {
              nodes: Array<Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>>;
            };
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title' | 'availableForSale' | 'quantityAvailable'
                > & {
                  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
                  >;
                }
              >;
            };
            metafields: Array<
              StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>
              >
            >;
          }
        >;
        pageInfo: Pick<StorefrontAPI.PageInfo, 'hasNextPage' | 'endCursor'>;
      };
    }
  >;
};

export type GetProductDetailQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GetProductDetailQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'handle'
      | 'title'
      | 'description'
      | 'descriptionHtml'
      | 'vendor'
      | 'productType'
      | 'tags'
      | 'availableForSale'
    > & {
      priceRange: {
        minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      compareAtPriceRange: {
        minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      featuredImage?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
      images: { nodes: Array<Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>> };
      options: Array<Pick<StorefrontAPI.ProductOption, 'id' | 'name' | 'values'>>;
      variants: {
        nodes: Array<
          Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'title' | 'availableForSale' | 'quantityAvailable'
          > & {
            selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
          }
        >;
      };
      seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
      metafields: Array<
        StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'namespace' | 'key' | 'value' | 'type'>>
      >;
    }
  >;
};

export type GetCollectionsQueryVariables = StorefrontAPI.Exact<{
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type GetCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'handle' | 'title' | 'description'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        productsCount: { nodes: Array<Pick<StorefrontAPI.Product, 'id'>> };
      }
    >;
  };
};

export type CustomerCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerCreateInput;
}>;

export type CustomerCreateMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Customer, 'id' | 'email' | 'firstName' | 'lastName'>
    >;
    customerUserErrors: Array<Pick<StorefrontAPI.CustomerUserError, 'field' | 'message' | 'code'>>;
  }>;
};

export type CustomerAccessTokenCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerAccessTokenCreateInput;
}>;

export type CustomerAccessTokenCreateMutation = {
  customerAccessTokenCreate?: StorefrontAPI.Maybe<{
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
    customerUserErrors: Array<Pick<StorefrontAPI.CustomerUserError, 'field' | 'message' | 'code'>>;
  }>;
};

export type CustomerQueryVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
}>;

export type CustomerQuery = {
  customer?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Customer,
      'id' | 'email' | 'firstName' | 'lastName' | 'phone' | 'acceptsMarketing' | 'createdAt'
    > & {
      defaultAddress?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.MailingAddress,
          'id' | 'address1' | 'address2' | 'city' | 'province' | 'country' | 'zip'
        >
      >;
      orders: {
        nodes: Array<
          Pick<
            StorefrontAPI.Order,
            'id' | 'orderNumber' | 'processedAt' | 'financialStatus' | 'fulfillmentStatus'
          > & {
            totalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            lineItems: { nodes: Array<Pick<StorefrontAPI.OrderLineItem, 'title' | 'quantity'>> };
          }
        >;
      };
    }
  >;
};

export type CartLineFragment = Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
  merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
    product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
    image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
    price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
};

export type CartFieldsFragment = Pick<
  StorefrontAPI.Cart,
  'id' | 'checkoutUrl' | 'totalQuantity'
> & {
  cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
  lines: {
    nodes: Array<
      Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
        merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        };
      }
    >;
  };
};

export type CartCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CartInput;
}>;

export type CartCreateMutation = {
  cartCreate?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        lines: {
          nodes: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            }
          >;
        };
      }
    >;
    userErrors: Array<Pick<StorefrontAPI.CartUserError, 'field' | 'message'>>;
  }>;
};

export type CartLinesAddMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lines: Array<StorefrontAPI.CartLineInput> | StorefrontAPI.CartLineInput;
}>;

export type CartLinesAddMutation = {
  cartLinesAdd?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        lines: {
          nodes: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            }
          >;
        };
      }
    >;
    userErrors: Array<Pick<StorefrontAPI.CartUserError, 'field' | 'message'>>;
  }>;
};

export type CartLinesUpdateMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lines: Array<StorefrontAPI.CartLineUpdateInput> | StorefrontAPI.CartLineUpdateInput;
}>;

export type CartLinesUpdateMutation = {
  cartLinesUpdate?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        lines: {
          nodes: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            }
          >;
        };
      }
    >;
    userErrors: Array<Pick<StorefrontAPI.CartUserError, 'field' | 'message'>>;
  }>;
};

export type CartLinesRemoveMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lineIds: Array<StorefrontAPI.Scalars['ID']['input']> | StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartLinesRemoveMutation = {
  cartLinesRemove?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
        lines: {
          nodes: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            }
          >;
        };
      }
    >;
    userErrors: Array<Pick<StorefrontAPI.CartUserError, 'field' | 'message'>>;
  }>;
};

export type CartQueryVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartQuery = {
  cart?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
      cost: { subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'> };
      lines: {
        nodes: Array<
          Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
            merchandise: Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            };
          }
        >;
      };
    }
  >;
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
  '#graphql\n  #graphql\n  fragment ProductMetafields on Product {\n    metafields(identifiers: [\n      {namespace: "custom", key: "brand_color"},\n      {namespace: "custom", key: "accent_color"},\n      {namespace: "custom", key: "benefits"},\n      {namespace: "custom", key: "ingredients"},\n      {namespace: "custom", key: "badges"}\n    ]) {\n      namespace\n      key\n      value\n      type\n    }\n  }\n\n  #graphql\n  fragment VariantFields on ProductVariant {\n    id\n    title\n    availableForSale\n    quantityAvailable\n    selectedOptions {\n      name\n      value\n    }\n    price {\n      amount\n      currencyCode\n    }\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n  }\n\n  query GetCollection($handle: String!, $first: Int = 20) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      image {\n        url\n        altText\n        width\n        height\n      }\n      products(first: $first) {\n        nodes {\n          id\n          handle\n          title\n          description\n          availableForSale\n          priceRange {\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n            maxVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          compareAtPriceRange {\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          featuredImage {\n            url\n            altText\n            width\n            height\n          }\n          images(first: 5) {\n            nodes {\n              url\n              altText\n              width\n              height\n            }\n          }\n          variants(first: 10) {\n            nodes {\n              ...VariantFields\n            }\n          }\n          ...ProductMetafields\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n': {
    return: GetCollectionQuery;
    variables: GetCollectionQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment ProductMetafields on Product {\n    metafields(identifiers: [\n      {namespace: "custom", key: "brand_color"},\n      {namespace: "custom", key: "accent_color"},\n      {namespace: "custom", key: "benefits"},\n      {namespace: "custom", key: "ingredients"},\n      {namespace: "custom", key: "badges"}\n    ]) {\n      namespace\n      key\n      value\n      type\n    }\n  }\n\n  #graphql\n  fragment VariantFields on ProductVariant {\n    id\n    title\n    availableForSale\n    quantityAvailable\n    selectedOptions {\n      name\n      value\n    }\n    price {\n      amount\n      currencyCode\n    }\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n  }\n\n  query GetProductDetail($handle: String!) {\n    product(handle: $handle) {\n      id\n      handle\n      title\n      description\n      descriptionHtml\n      vendor\n      productType\n      tags\n      availableForSale\n      priceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      compareAtPriceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      featuredImage {\n        url\n        altText\n        width\n        height\n      }\n      images(first: 10) {\n        nodes {\n          url\n          altText\n          width\n          height\n        }\n      }\n      options {\n        id\n        name\n        values\n      }\n      variants(first: 100) {\n        nodes {\n          ...VariantFields\n        }\n      }\n      seo {\n        title\n        description\n      }\n      ...ProductMetafields\n    }\n  }\n': {
    return: GetProductDetailQuery;
    variables: GetProductDetailQueryVariables;
  };
  '#graphql\n  query GetCollections($first: Int = 10) {\n    collections(first: $first) {\n      nodes {\n        id\n        handle\n        title\n        description\n        image {\n          url\n          altText\n          width\n          height\n        }\n        productsCount: products(first: 1) {\n          nodes {\n            id\n          }\n        }\n      }\n    }\n  }\n': {
    return: GetCollectionsQuery;
    variables: GetCollectionsQueryVariables;
  };
  '#graphql\n  query Customer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      id\n      email\n      firstName\n      lastName\n      phone\n      acceptsMarketing\n      createdAt\n      defaultAddress {\n        id\n        address1\n        address2\n        city\n        province\n        country\n        zip\n      }\n      orders(first: 10) {\n        nodes {\n          id\n          orderNumber\n          processedAt\n          financialStatus\n          fulfillmentStatus\n          totalPrice {\n            amount\n            currencyCode\n          }\n          lineItems(first: 5) {\n            nodes {\n              title\n              quantity\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CustomerQuery;
    variables: CustomerQueryVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CartLine on CartLine {\n    id\n    quantity\n    merchandise {\n      ... on ProductVariant {\n        id\n        title\n        product {\n          title\n          handle\n        }\n        image {\n          url\n          altText\n        }\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        ...CartLine\n      }\n    }\n  }\n\n  query cart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartFields\n    }\n  }\n': {
    return: CartQuery;
    variables: CartQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n  mutation CustomerCreate($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n        email\n        firstName\n        lastName\n      }\n      customerUserErrors {\n        field\n        message\n        code\n      }\n    }\n  }\n': {
    return: CustomerCreateMutation;
    variables: CustomerCreateMutationVariables;
  };
  '#graphql\n  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        field\n        message\n        code\n      }\n    }\n  }\n': {
    return: CustomerAccessTokenCreateMutation;
    variables: CustomerAccessTokenCreateMutationVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CartLine on CartLine {\n    id\n    quantity\n    merchandise {\n      ... on ProductVariant {\n        id\n        title\n        product {\n          title\n          handle\n        }\n        image {\n          url\n          altText\n        }\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        ...CartLine\n      }\n    }\n  }\n\n  mutation cartCreate($input: CartInput!) {\n    cartCreate(input: $input) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CartCreateMutation;
    variables: CartCreateMutationVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CartLine on CartLine {\n    id\n    quantity\n    merchandise {\n      ... on ProductVariant {\n        id\n        title\n        product {\n          title\n          handle\n        }\n        image {\n          url\n          altText\n        }\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        ...CartLine\n      }\n    }\n  }\n\n  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CartLinesAddMutation;
    variables: CartLinesAddMutationVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CartLine on CartLine {\n    id\n    quantity\n    merchandise {\n      ... on ProductVariant {\n        id\n        title\n        product {\n          title\n          handle\n        }\n        image {\n          url\n          altText\n        }\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        ...CartLine\n      }\n    }\n  }\n\n  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CartLinesUpdateMutation;
    variables: CartLinesUpdateMutationVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CartLine on CartLine {\n    id\n    quantity\n    merchandise {\n      ... on ProductVariant {\n        id\n        title\n        product {\n          title\n          handle\n        }\n        image {\n          url\n          altText\n        }\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    totalQuantity\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      nodes {\n        ...CartLine\n      }\n    }\n  }\n\n  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartFields\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CartLinesRemoveMutation;
    variables: CartLinesRemoveMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
