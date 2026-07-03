'use server';

import { cookies } from 'next/headers';
import {
  createCart,
  addItemToCart,
  removeItemFromCart,
  getCart,
  type FWCart,
} from '@/lib/fourthwall';

const CART_COOKIE = 'fw_cart_id';
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
};
const CHECKOUT_BASE = 'https://erik-sjoeholm-shop.fourthwall.com';

export async function addToCart(variantId: string): Promise<FWCart | null> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;

  if (!cartId) {
    const cart = await createCart(variantId);
    if (cart) store.set(CART_COOKIE, cart.id, COOKIE_OPTS);
    return cart;
  }

  const cart = await addItemToCart(cartId, variantId);
  if (cart) return cart;

  // Cart expired — create a fresh one
  const fresh = await createCart(variantId);
  if (fresh) store.set(CART_COOKIE, fresh.id, COOKIE_OPTS);
  return fresh;
}

export async function removeFromCart(variantId: string): Promise<FWCart | null> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return removeItemFromCart(cartId, variantId);
}

export async function getCartData(): Promise<FWCart | null> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return getCart(cartId);
}

export async function checkoutUrl(): Promise<string | null> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return `${CHECKOUT_BASE}/checkout/?cartId=${cartId}&cartCurrency=USD`;
}
