import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@shopify/remix-oxygen';
import { Layout } from '~/components/layout/Layout';
import tokensHref from '~/styles/tokens.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tokensHref },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400&display=swap',
  },
];

export const meta: MetaFunction = () => [
  { title: 'Jay Life | Small upgrades compound' },
  { name: 'description', content: 'Daily rituals for focus, calm, and performance.' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
  { name: 'theme-color', content: '#FAF9F5' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-acid focus:text-charcoal focus:px-4 focus:py-2 focus:rounded-button focus:font-medium"
        >
          Skip to content
        </a>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message ?? error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center px-5">
          <div className="text-center">
            <h1 className="text-hero font-bold mb-4">{errorStatus}</h1>
            <p className="text-muted">{errorMessage}</p>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
