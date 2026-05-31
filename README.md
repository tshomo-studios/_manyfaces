# manyfaces

Storefront for **Tshomo Studios Manyfaces™**, deployed at [manyfaces.co.za](https://manyfaces.co.za).

The site itself is a static Vite build hosted on Vercel. Products, cart, and checkout are powered by Shopify via the Storefront API. Customers stay on `manyfaces.co.za` until they click **Checkout**, at which point they are redirected to Shopify's hosted checkout page for payment.

---

## Tech stack

| Layer | Tool |
|---|---|
| Build | [Vite](https://vitejs.dev/) 8 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 (via `@tailwindcss/vite`) |
| Frontend | Vanilla JavaScript (ES modules) |
| Commerce backend | [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (via `@shopify/storefront-api-client`) |
| Hosting | [Vercel](https://vercel.com/) (frontend) + Shopify (checkout) |

---

## Local development

### 1. Clone and install

```bash
git clone https://github.com/tshomo-studios/_manyfaces.git
cd _manyfaces
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

| Variable | Description | Example |
|---|---|---|
| `VITE_SHOPIFY_DOMAIN` | The store's `.myshopify.com` domain | `qahw4a-as.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Public Storefront API access token (see [Shopify setup](#shopify-setup)) | `a76c0ac0b3f05f5b85797beb32faeddf` |
| `VITE_SHOPIFY_API_VERSION` | Storefront API version | `2025-01` |

`.env.local` is gitignored. The Storefront access token is a **public** token by design — it is embedded in the browser bundle and is safe to expose. Never put the **Private** access token (the `shpat_...` one) in this file.

### 3. Run the dev server

```bash
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Pages available:

- `/` — homepage
- `/grootman.html` — Grootman product page

### 4. Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serves the built dist/ locally
```

---

## Shopify setup

These steps only need to be done once per store. They produce the credentials used in `.env.local` and in Vercel.

### 1. Install the **Headless** sales channel

In Shopify admin (`admin.shopify.com/store/<your-store>`):

1. **Settings → Apps and sales channels → Shopify App Store**
2. Search for **Headless** (by Shopify) and install it
3. The Headless channel now appears under **Sales channels** in the sidebar

### 2. Create a storefront

1. Open **Headless** from the sidebar
2. Click **Create storefront** → choose **Custom storefront** → name it (e.g. `manyfaces-web`)

### 3. Configure permissions and copy the token

1. On the storefront detail page, click **Manage** next to **Storefront API**
2. Confirm these scopes are ticked (and click **Save** if anything changes):
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
3. Copy the **Public access token** — this is the value for `VITE_SHOPIFY_STOREFRONT_TOKEN`

### 4. Find the store domain

**Settings → Domains** in the store admin. Use the `.myshopify.com` entry (not the custom domain) as `VITE_SHOPIFY_DOMAIN`.

### 5. Add products

Each product must be:

- **Active** (Status = Active in the product editor)
- **Available in the Headless sales channel** (Publishing → All channels, or explicitly tick Headless)
- **In stock** — either set Inventory **Quantity ≥ 1** at a location, or untick **Track quantity**

The frontend looks up products by **handle** (the URL slug, e.g. `grootman`). The handle is shown at the bottom of the product editor under *Search engine listing*.

To add a new product page to the site:

1. Add the product in Shopify admin and note the handle
2. Duplicate `grootman.html` and update the `data-product-handle` attribute on `<main>` to the new handle
3. Add the new HTML file to the `rollupOptions.input` block in [`vite.config.ts`](./vite.config.ts)

---

## Deployment (Vercel)

### 1. Add environment variables

In the Vercel project dashboard:

**Settings → Environment Variables** — add the same three variables from `.env.local`, with the scope set to **Production, Preview, and Development**:

| Name | Value (example) |
|---|---|
| `VITE_SHOPIFY_DOMAIN` | `qahw4a-as.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | `a76c0ac0b3f05f5b85797beb32faeddf` |
| `VITE_SHOPIFY_API_VERSION` | `2025-01` |

Vite only inlines env vars that start with `VITE_`, and they are baked in at build time — changing them requires a fresh deploy.

### 2. Deploy

Push to `main`:

```bash
git push origin main
```

Vercel auto-deploys on push. To redeploy without code changes (e.g. after changing env vars), use **Deployments → ⋯ → Redeploy** in the Vercel dashboard.

### 3. Verify

Open the deployed site in an incognito window and confirm:

1. Product page loads with the title, price, and an enabled **add to cart** button (not "loading…" or "out of stock")
2. Clicking **add to cart** opens the cart drawer with the item
3. Clicking **Checkout** redirects to `<store>.myshopify.com/checkouts/...`

If add-to-cart stays disabled, check the browser console — the most common cause is missing env vars on Vercel.

---

## Project structure

```
.
├── index.html             # Homepage
├── grootman.html          # Grootman product page
├── src/
│   ├── main.js            # Entry point: cart + product page logic
│   ├── style.css          # Tailwind entry
│   ├── shopify/
│   │   └── client.js      # Storefront API client + cart helpers
│   └── assets/            # Images, fonts, icons
├── vite.config.ts         # Vite config (multi-page input)
├── .env.example           # Template for required env vars
└── .env.local             # Local-only credentials (gitignored)
```

---

## Architecture notes

- **No backend.** The browser talks directly to Shopify's Storefront API using the public token.
- **Cart state** is held by Shopify (a `Cart` object). Only the cart ID is persisted in `localStorage` under `manyfaces-shopify-cart-id`.
- **Checkout** is Shopify-hosted. The Checkout button reads `cart.checkoutUrl` from the Shopify Cart and redirects there. Payment, shipping, tax, fraud, and order emails are all Shopify's responsibility.
- **Products** are fetched per-page via `fetchProductByHandle(handle)`. Title, price, and availability are hydrated into the DOM at runtime; the HTML contains placeholder text shown only until the API responds.
