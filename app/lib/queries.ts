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

  // Transform to our Ritual interface
  return {
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    tagline: shopifyProduct.description?.split('\n')[0] || '',
    description: shopifyProduct.description || '',
    price,
    image,
    rating: 4.8, // Default (would come from reviews)
    reviewCount: 0,
    inStock: true,
    badges: metafieldsMap.get('badges') || [],
    ingredients: metafieldsMap.get('ingredients') || [],
  };
}
