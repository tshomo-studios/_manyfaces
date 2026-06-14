import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const publicAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01';
const isConfigured = Boolean(storeDomain && publicAccessToken);

const client = isConfigured
  ? createStorefrontApiClient({
      storeDomain,
      apiVersion,
      publicAccessToken,
    })
  : null;

const cartIdKey = 'manyfaces-shopify-cart-id';

const productByHandleQuery = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage { url altText }
      images(first: 5) { nodes { url altText } }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  }
`;

const cartQuery = `
  query Cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              image { url altText }
              product { title handle }
            }
          }
        }
      }
    }
  }
`;

const cartCreateMutation = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

const cartLinesAddMutation = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const cartLinesUpdateMutation = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const cartLinesRemoveMutation = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const request = async (operation, variables) => {
  if (!client) {
    throw new Error('Shopify env vars missing: set VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN in .env.local');
  }

  const { data, errors } = await client.request(operation, { variables });

  if (errors) {
    throw new Error(errors.message || 'Shopify request failed');
  }

  return data;
};

export const fetchProductByHandle = async (handle) => {
  const data = await request(productByHandleQuery, { handle });
  return data?.product || null;
};

const readCartId = () => localStorage.getItem(cartIdKey);
const writeCartId = (id) => localStorage.setItem(cartIdKey, id);
const clearCartId = () => localStorage.removeItem(cartIdKey);

export const fetchCart = async () => {
  const id = readCartId();
  if (!id) return null;

  const data = await request(cartQuery, { id });

  if (!data?.cart) {
    clearCartId();
    return null;
  }

  return data.cart;
};

export const addToCart = async (variantId, quantity = 1) => {
  const cartId = readCartId();
  const line = { merchandiseId: variantId, quantity };

  if (!cartId) {
    const data = await request(cartCreateMutation, { lines: [line] });
    const newCart = data?.cartCreate?.cart;
    const userErrors = data?.cartCreate?.userErrors || [];
    if (userErrors.length) throw new Error(userErrors[0].message);
    if (newCart?.id) writeCartId(newCart.id);
    return fetchCart();
  }

  const data = await request(cartLinesAddMutation, { cartId, lines: [line] });
  const userErrors = data?.cartLinesAdd?.userErrors || [];
  if (userErrors.length) throw new Error(userErrors[0].message);
  return fetchCart();
};

export const updateLineQuantity = async (lineId, quantity) => {
  const cartId = readCartId();
  if (!cartId) return null;

  if (quantity <= 0) {
    return removeLine(lineId);
  }

  const data = await request(cartLinesUpdateMutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const userErrors = data?.cartLinesUpdate?.userErrors || [];
  if (userErrors.length) throw new Error(userErrors[0].message);
  return fetchCart();
};

export const removeLine = async (lineId) => {
  const cartId = readCartId();
  if (!cartId) return null;

  const data = await request(cartLinesRemoveMutation, { cartId, lineIds: [lineId] });
  const userErrors = data?.cartLinesRemove?.userErrors || [];
  if (userErrors.length) throw new Error(userErrors[0].message);
  return fetchCart();
};
