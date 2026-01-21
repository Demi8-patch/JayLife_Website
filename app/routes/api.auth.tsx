/**
 * Auth API Route
 *
 * Handles customer authentication via Shopify Storefront API.
 * Supports login, registration, and token verification.
 */

import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { storefront } from '~/lib/shopify.server';

// ============================================================================
// GraphQL Mutations & Queries
// ============================================================================

const CUSTOMER_CREATE = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `#graphql
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_QUERY = `#graphql
  query Customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
      createdAt
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
      }
      orders(first: 10) {
        nodes {
          id
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 5) {
            nodes {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

// ============================================================================
// Types
// ============================================================================

interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
    } | null;
    customerUserErrors: Array<{
      field: string[] | null;
      message: string;
      code: string;
    }>;
  };
}

interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
      expiresAt: string;
    } | null;
    customerUserErrors: Array<{
      field: string[] | null;
      message: string;
      code: string;
    }>;
  };
}

interface CustomerQueryResponse {
  customer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    acceptsMarketing: boolean;
    createdAt: string;
    defaultAddress: {
      id: string;
      address1: string | null;
      address2: string | null;
      city: string | null;
      province: string | null;
      country: string | null;
      zip: string | null;
    } | null;
    orders: {
      nodes: Array<{
        id: string;
        orderNumber: number;
        processedAt: string;
        financialStatus: string;
        fulfillmentStatus: string;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        lineItems: {
          nodes: Array<{
            title: string;
            quantity: number;
          }>;
        };
      }>;
    };
  } | null;
}

// ============================================================================
// Loader - Token Verification
// ============================================================================

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return json({ customer: null });
  }

  try {
    const data = await storefront<CustomerQueryResponse>(CUSTOMER_QUERY, {
      customerAccessToken: token,
    });

    if (data.customer) {
      return json({
        customer: {
          id: data.customer.id,
          email: data.customer.email,
          firstName: data.customer.firstName,
          lastName: data.customer.lastName,
        },
      });
    }

    return json({ customer: null, error: 'Token expired or invalid' });
  } catch (error) {
    console.error('Token verification failed:', error);
    return json({ customer: null, error: 'Verification failed' });
  }
}

// ============================================================================
// Action - Login & Register
// ============================================================================

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action') as string;

  try {
    switch (action) {
      case 'login': {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
          return json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Create access token
        const tokenResult = await storefront<CustomerAccessTokenCreateResponse>(
          CUSTOMER_ACCESS_TOKEN_CREATE,
          { input: { email, password } }
        );

        const tokenErrors = tokenResult.customerAccessTokenCreate.customerUserErrors;
        if (tokenErrors?.length > 0) {
          return json({ error: tokenErrors[0].message }, { status: 400 });
        }

        const accessToken = tokenResult.customerAccessTokenCreate.customerAccessToken;
        if (!accessToken) {
          return json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Fetch customer data
        const customerResult = await storefront<CustomerQueryResponse>(CUSTOMER_QUERY, {
          customerAccessToken: accessToken.accessToken,
        });

        if (!customerResult.customer) {
          return json({ error: 'Customer not found' }, { status: 404 });
        }

        return json({
          customer: {
            id: customerResult.customer.id,
            email: customerResult.customer.email,
            firstName: customerResult.customer.firstName,
            lastName: customerResult.customer.lastName,
          },
          token: accessToken.accessToken,
        });
      }

      case 'register': {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const firstName = (formData.get('firstName') as string) || '';
        const lastName = (formData.get('lastName') as string) || '';

        if (!email || !password) {
          return json({ error: 'Email and password are required' }, { status: 400 });
        }

        if (password.length < 8) {
          return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        // Create customer
        const createResult = await storefront<CustomerCreateResponse>(CUSTOMER_CREATE, {
          input: {
            email,
            password,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            acceptsMarketing: false,
          },
        });

        const createErrors = createResult.customerCreate.customerUserErrors;
        if (createErrors?.length > 0) {
          return json({ error: createErrors[0].message }, { status: 400 });
        }

        if (!createResult.customerCreate.customer) {
          return json({ error: 'Failed to create account' }, { status: 500 });
        }

        // Auto-login after registration
        const tokenResult = await storefront<CustomerAccessTokenCreateResponse>(
          CUSTOMER_ACCESS_TOKEN_CREATE,
          { input: { email, password } }
        );

        const accessToken = tokenResult.customerAccessTokenCreate.customerAccessToken;

        return json({
          customer: {
            id: createResult.customerCreate.customer.id,
            email: createResult.customerCreate.customer.email,
            firstName: createResult.customerCreate.customer.firstName,
            lastName: createResult.customerCreate.customer.lastName,
          },
          token: accessToken?.accessToken || null,
        });
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth action failed:', error);
    return json({ error: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}
