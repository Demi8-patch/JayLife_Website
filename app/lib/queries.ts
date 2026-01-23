/**
 * GraphQL fragment for product metafields
 */
import type { Ritual } from './mock-data';
export const PRODUCT_METAFIELDS_FRAGMENT = `#graphql
  fragment ProductMetafields on Product {
    metafields(identifiers: [
      {namespace: "custom", key: "brand_color"},
      {namespace: "custom", key: "accent_color"},
      {namespace: "custom", key: "benefits"},
      {namespace: "custom", key: "ingredients"},
      {namespace: "custom", key: "badges"}
    ]) {
      namespace
      key
      value
      type
    }
  }
`;

/**
 * Query to fetch a single product by handle with metafields
 */
export const PRODUCT_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      ...ProductMetafields
    }
  }
`;

/**
 * Query to fetch all products with metafields
 */
export const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        ...ProductMetafields
      }
    }
  }
`;

/**
 * Helper to parse metafield value based on type
 */
function parseMetafieldValue(metafield: { type: string; value: string }): any {
  if (metafield.type === 'json') {
    try {
      return JSON.parse(metafield.value);
    } catch {
      return null;
    }
  }
  if (metafield.type === 'list.single_line_text_field') {
    try {
      return JSON.parse(metafield.value);
    } catch {
      return metafield.value.split(',').map((s) => s.trim());
    }
  }
  return metafield.value;
}

/**
 * GraphQL fragment for variant details
 */
export const VARIANT_FRAGMENT = `#graphql
  fragment VariantFields on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      url
      altText
      width
      height
    }
  }
`;

/**
 * Query to fetch a collection by handle with products
 */
export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  ${VARIANT_FRAGMENT}
  query GetCollection($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 5) {
            nodes {
              url
              altText
              width
              height
            }
          }
          variants(first: 10) {
            nodes {
              ...VariantFields
            }
          }
          ...ProductMetafields
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

/**
 * Query to fetch a single product with full details including all variants
 */
export const PRODUCT_DETAIL_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  ${VARIANT_FRAGMENT}
  query GetProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        nodes {
          ...VariantFields
        }
      }
      seo {
        title
        description
      }
      ...ProductMetafields
    }
  }
`;

/**
 * Query to fetch all collections
 */
export const COLLECTIONS_QUERY = `#graphql
  query GetCollections($first: Int = 10) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        productsCount: products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

/**
 * Transform Shopify product data to our Ritual interface
 */
export function transformShopifyProduct(shopifyProduct: any): Ritual {
  // Extract metafields
  const metafieldsMap = new Map();
  if (shopifyProduct.metafields) {
    shopifyProduct.metafields.forEach((metafield: any) => {
      if (metafield) {
        metafieldsMap.set(metafield.key, parseMetafieldValue(metafield));
      }
    });
  }

  // Format price as number (matching Ritual interface)
  const price = shopifyProduct.priceRange?.minVariantPrice
    ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
    : 0;

  // Get image URL
  const image = shopifyProduct.featuredImage?.url || '/images/placeholder.jpg';

  // Get first variant ID for add-to-cart
  const firstVariant = shopifyProduct.variants?.nodes?.[0];
  const variantId = firstVariant?.id || null;

  // Transform to our Ritual interface
  return {
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    tagline: shopifyProduct.description?.split('\n')[0] || '',
    description: shopifyProduct.description || '',
    price,
    image,
    id: shopifyProduct.id,
    variantId,
    rating: 4.8, // Default (would come from reviews)
    reviewCount: 0,
    inStock: firstVariant?.availableForSale ?? true,
    badges: metafieldsMap.get('badges') || [],
    ingredients: metafieldsMap.get('ingredients') || [],
  };
}
