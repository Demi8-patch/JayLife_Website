/**
 * Shopify Storefront API Client
 *
 * Server-side utility for making authenticated requests to the Shopify Storefront GraphQL API.
 * This file should only be imported in server-side code (loaders, actions).
 */

const SHOPIFY_STOREFRONT_API_URL = `https://${process.env.PUBLIC_STORE_DOMAIN}/api/2024-01/graphql.json`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN!;

interface StorefrontResponse<T> {
  data: T;
  errors?: Array<{ message: string; locations?: Array<{ line: number; column: number }> }>;
}

interface StorefrontOptions {
  /** Cache strategy for the request */
  cache?: RequestCache;
  /** Custom headers to include */
  headers?: Record<string, string>;
}

/**
 * Execute a GraphQL query against the Shopify Storefront API
 *
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param options - Optional configuration
 * @returns The data from the GraphQL response
 * @throws Error if the request fails or returns GraphQL errors
 *
 * @example
 * ```ts
 * const data = await storefront<{ products: { nodes: Product[] } }>(
 *   PRODUCTS_QUERY,
 *   { first: 10 }
 * );
 * ```
 */
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: StorefrontOptions = {}
): Promise<T> {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      'Missing Shopify Storefront API token. Set PUBLIC_STOREFRONT_API_TOKEN in your environment.'
    );
  }

  if (!process.env.PUBLIC_STORE_DOMAIN) {
    throw new Error('Missing Shopify store domain. Set PUBLIC_STORE_DOMAIN in your environment.');
  }

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      ...options.headers,
    },
    body: JSON.stringify({ query, variables }),
    cache: options.cache,
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: StorefrontResponse<T> = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  return json.data;
}

/**
 * Storefront API client with built-in caching strategies
 */
export const storefrontClient = {
  /**
   * Execute a query with default caching
   */
  query: storefront,

  /**
   * Execute a query with no caching (for dynamic data)
   */
  async noCache<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
    return storefront<T>(query, variables, { cache: 'no-store' });
  },

  /**
   * Execute a query with aggressive caching (for static data)
   */
  async cached<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
    return storefront<T>(query, variables, { cache: 'force-cache' });
  },
};

export default storefront;
