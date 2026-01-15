// @ts-ignore - Virtual module provided by Hydrogen
import * as remixBuild from 'virtual:remix/server-build';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';
import { createStorefrontClient } from '@shopify/hydrogen';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      // Create Storefront client with mock config
      const { storefront } = createStorefrontClient({
        storeDomain: env.PUBLIC_STORE_DOMAIN || 'mock-store.myshopify.com',
        storefrontApiVersion: '2024-10',
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN || 'mock_token',
        storefrontHeaders: getStorefrontHeaders(request),
      });

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          storefront,
          env,
          waitUntil: (p: Promise<unknown>) => executionContext.waitUntil(p),
        }),
      });

      const response = await handleRequest(request);

      // Add cache headers for product pages
      if (request.url.includes('/ritual/')) {
        response.headers.set(
          'Cache-Control',
          'public, max-age=3600, s-maxage=3600, stale-while-revalidate=60',
        );
      }

      return response;
    } catch (error) {
      console.error('Server error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};

// Environment type definition
interface Env {
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  SESSION_SECRET: string;
  [key: string]: string;
}
