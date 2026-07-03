import 'server-only';

const BASE = 'https://storefront-api.fourthwall.com/v1';

function fw(path: string): string {
  const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
  const sep = path.includes('?') ? '&' : '?';
  return `${BASE}${path}${sep}storefront_token=${token}`;
}

export interface FWMoney {
  value: number;
  currency: string;
}

export interface FWImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface FWVariant {
  id: string;
  name: string;
  sku: string;
  unitPrice: FWMoney;
  compareAtPrice: FWMoney | null;
  attributes: {
    color?: { name: string; swatch: string };
    size?: { name: string };
  };
  stock: { type: 'UNLIMITED' | 'LIMITED' | 'OUT_OF_STOCK'; inStock?: number };
  images: FWImage[];
}

export interface FWProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: FWImage[];
  variants: FWVariant[];
  state: { type: 'AVAILABLE' | 'UNAVAILABLE' };
}

export interface FWCartItem {
  variant: { id: string; name: string; unitPrice: FWMoney };
  product: { id: string; name: string; slug: string };
  quantity: number;
  totalPrice: FWMoney;
}

export interface FWCart {
  id: string;
  items: FWCartItem[];
  subtotal: FWMoney;
}

export async function getProducts(): Promise<FWProduct[]> {
  const res = await fetch(fw('/collections/all/products?currency=USD'), {
    next: { revalidate: 3600, tags: ['fw-products'] },
  });
  if (!res.ok) {
    console.error(`Fourthwall products error: ${res.status}`);
    return [];
  }
  const json = await res.json();
  return (json.results ?? []) as FWProduct[];
}

export async function getProduct(slug: string): Promise<FWProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCart(cartId: string): Promise<FWCart | null> {
  const res = await fetch(fw(`/carts/${cartId}`), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json() as Promise<FWCart>;
}

export async function createCart(variantId: string, currency = 'USD'): Promise<FWCart | null> {
  const res = await fetch(fw('/carts'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currency, items: [{ variantId, quantity: 1 }] }),
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error(`Fourthwall create cart error: ${res.status} ${await res.text()}`);
    return null;
  }
  return res.json() as Promise<FWCart>;
}

export async function addItemToCart(cartId: string, variantId: string): Promise<FWCart | null> {
  const res = await fetch(fw(`/carts/${cartId}/add`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ variantId, quantity: 1 }] }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json() as Promise<FWCart>;
}

export async function removeItemFromCart(cartId: string, variantId: string): Promise<FWCart | null> {
  const res = await fetch(fw(`/carts/${cartId}/remove`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ variantId }] }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json() as Promise<FWCart>;
}
