/**
 * Cart API Route
 *
 * Handles cart operations via Shopify Storefront API GraphQL mutations.
 * Supports: create, add, update, remove operations.
 */

import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

// GraphQL Fragments
const CART_LINE_FRAGMENT = `#graphql
  fragment CartLine on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        product {
          title
          handle
        }
        image {
          url
          altText
        }
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

const CART_FRAGMENT = `#graphql
  ${CART_LINE_FRAGMENT}
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        ...CartLine
      }
    }
  }
`;

// GraphQL Mutations
const CART_CREATE_MUTATION = `#graphql
  ${CART_FRAGMENT}
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL Query
const CART_QUERY = `#graphql
  ${CART_FRAGMENT}
  query cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

// Types
interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  variantTitle?: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface TransformedCart {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: {
    amount: string;
    currencyCode: string;
  };
  checkoutUrl: string;
}

interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: ShopifyCartLine[];
  };
}

/**
 * Transform Shopify cart response to our normalized format
 */
function transformCart(shopifyCart: ShopifyCart | null): TransformedCart | null {
  if (!shopifyCart) return null;

  const lines: CartLine[] = shopifyCart.lines.nodes.map((line) => ({
    id: line.id,
    merchandiseId: line.merchandise.id,
    quantity: line.quantity,
    title: line.merchandise.product.title,
    variantTitle: line.merchandise.title !== 'Default Title' ? line.merchandise.title : undefined,
    handle: line.merchandise.product.handle,
    image: line.merchandise.image,
    price: line.merchandise.price,
  }));

  return {
    id: shopifyCart.id,
    lines,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: shopifyCart.cost.subtotalAmount,
    checkoutUrl: shopifyCart.checkoutUrl,
  };
}

/**
 * Loader: GET cart by ID
 */
export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const cartId = url.searchParams.get('cartId');

  if (!cartId) {
    return json({ cart: null });
  }

  try {
    const { storefront } = context;
    const { cart } = await storefront.query<{ cart: ShopifyCart | null }>(CART_QUERY, {
      variables: { cartId },
      cache: storefront.CacheNone(),
    });

    if (!cart) {
      return json({ cart: null, error: 'Cart not found' });
    }

    return json({ cart: transformCart(cart) });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return json({ cart: null, error: 'Failed to fetch cart' }, { status: 500 });
  }
}

/**
 * Action: Handle cart mutations (add, update, remove)
 */
export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action') as string;
  const cartId = formData.get('cartId') as string;
  const { storefront } = context;

  try {
    switch (action) {
      case 'add': {
        const merchandiseId = formData.get('merchandiseId') as string;
        const quantity = parseInt(formData.get('quantity') as string) || 1;

        if (!merchandiseId) {
          return json({ error: 'Missing merchandiseId' }, { status: 400 });
        }

        // If no cart exists, create one
        if (!cartId) {
          const { cartCreate } = await storefront.mutate<{
            cartCreate: {
              cart: ShopifyCart;
              userErrors: Array<{ field: string[]; message: string }>;
            };
          }>(CART_CREATE_MUTATION, {
            variables: {
              input: {
                lines: [{ merchandiseId, quantity }],
              },
            },
          });

          if (cartCreate.userErrors.length > 0) {
            return json({ error: cartCreate.userErrors[0].message }, { status: 400 });
          }

          return json({ cart: transformCart(cartCreate.cart) });
        }

        // Add to existing cart
        const { cartLinesAdd } = await storefront.mutate<{
          cartLinesAdd: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
          };
        }>(CART_LINES_ADD_MUTATION, {
          variables: {
            cartId,
            lines: [{ merchandiseId, quantity }],
          },
        });

        if (cartLinesAdd.userErrors.length > 0) {
          return json({ error: cartLinesAdd.userErrors[0].message }, { status: 400 });
        }

        return json({ cart: transformCart(cartLinesAdd.cart) });
      }

      case 'update': {
        const lineId = formData.get('lineId') as string;
        const quantity = parseInt(formData.get('quantity') as string);

        if (!cartId || !lineId) {
          return json({ error: 'Missing cartId or lineId' }, { status: 400 });
        }

        // If quantity is 0 or less, remove the line
        if (quantity <= 0) {
          const { cartLinesRemove } = await storefront.mutate<{
            cartLinesRemove: {
              cart: ShopifyCart;
              userErrors: Array<{ field: string[]; message: string }>;
            };
          }>(CART_LINES_REMOVE_MUTATION, {
            variables: {
              cartId,
              lineIds: [lineId],
            },
          });

          if (cartLinesRemove.userErrors.length > 0) {
            return json({ error: cartLinesRemove.userErrors[0].message }, { status: 400 });
          }

          return json({ cart: transformCart(cartLinesRemove.cart) });
        }

        const { cartLinesUpdate } = await storefront.mutate<{
          cartLinesUpdate: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
          };
        }>(CART_LINES_UPDATE_MUTATION, {
          variables: {
            cartId,
            lines: [{ id: lineId, quantity }],
          },
        });

        if (cartLinesUpdate.userErrors.length > 0) {
          return json({ error: cartLinesUpdate.userErrors[0].message }, { status: 400 });
        }

        return json({ cart: transformCart(cartLinesUpdate.cart) });
      }

      case 'remove': {
        const lineId = formData.get('lineId') as string;

        if (!cartId || !lineId) {
          return json({ error: 'Missing cartId or lineId' }, { status: 400 });
        }

        const { cartLinesRemove } = await storefront.mutate<{
          cartLinesRemove: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
          };
        }>(CART_LINES_REMOVE_MUTATION, {
          variables: {
            cartId,
            lineIds: [lineId],
          },
        });

        if (cartLinesRemove.userErrors.length > 0) {
          return json({ error: cartLinesRemove.userErrors[0].message }, { status: 400 });
        }

        return json({ cart: transformCart(cartLinesRemove.cart) });
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cart action error:', error);
    return json({ error: 'Cart operation failed' }, { status: 500 });
  }
}
