import './style.css';
import removeIcon from './assets/img/delete_forever.svg';
import {
  fetchProductByHandle,
  fetchCart,
  addToCart,
  updateLineQuantity,
  removeLine,
} from './shopify/client.js';

const defaultProductSubtitle = 'Art toy (25cm x 18cm x 18cm)';

const formatMoney = (amount, currencyCode) => {
  const value = Math.round(Number(amount));
  if (currencyCode === 'ZAR') return `R${value}`;
  return `${currencyCode || ''} ${value}`.trim();
};

const setupCart = () => {
  const drawer = document.querySelector('[data-cart-drawer]');
  const backdrop = document.querySelector('[data-cart-backdrop]');
  const openButtons = document.querySelectorAll('[data-cart-open]');
  const closeButtons = document.querySelectorAll('[data-cart-close]');
  const countElements = document.querySelectorAll('[data-cart-count]');
  const itemsContainer = document.querySelector('[data-cart-items]');
  const emptyMessage = document.querySelector('[data-cart-empty]');
  const subtotalElement = document.querySelector('[data-cart-subtotal]');
  const checkoutButton = document.querySelector('[data-checkout-button]');

  if (!drawer || !backdrop || openButtons.length === 0 || !itemsContainer || !emptyMessage || !subtotalElement) {
    return null;
  }

  let currentCart = null;

  const openCart = () => {
    backdrop.classList.remove('hidden');

    window.requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-y-full', 'md:translate-x-full');
      drawer.classList.add('translate-y-0', 'md:translate-x-0');
    });

    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  };

  const closeCart = () => {
    backdrop.classList.add('opacity-0');
    drawer.classList.remove('translate-y-0', 'md:translate-x-0');
    drawer.classList.add('translate-y-full', 'md:translate-x-full');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');

    window.setTimeout(() => {
      if (drawer.getAttribute('aria-hidden') === 'true') {
        backdrop.classList.add('hidden');
      }
    }, 500);
  };

  const render = () => {
    const lines = currentCart?.lines?.nodes || [];
    const totalQuantity = currentCart?.totalQuantity || 0;
    const subtotal = currentCart?.cost?.subtotalAmount;

    countElements.forEach((element) => {
      element.textContent = totalQuantity;
    });

    emptyMessage.classList.toggle('hidden', lines.length > 0);

    subtotalElement.textContent = subtotal
      ? formatMoney(subtotal.amount, subtotal.currencyCode)
      : 'R0';

    if (checkoutButton) {
      checkoutButton.disabled = lines.length === 0;
      checkoutButton.textContent = lines.length === 0 ? 'Cart empty' : 'Checkout';
    }

    itemsContainer.innerHTML = lines.map((line) => {
      const variant = line.merchandise;
      const title = variant?.product?.title || 'Item';
      const image = variant?.image?.url || '';
      const altText = variant?.image?.altText || title;
      const price = formatMoney(variant?.price?.amount, variant?.price?.currencyCode);

      return `
        <article class="grid grid-cols-[minmax(0,1fr)_8.75rem] items-end gap-5">
          <img src="${image}" alt="${altText}" class="h-40 w-full self-end object-contain object-bottom">

          <div class="grid gap-1 pb-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-5xl font-semibold leading-none">${title}</h3>
                <p class="font-sans text-[10px] leading-4">${defaultProductSubtitle}</p>
              </div>

              <button type="button" aria-label="Remove ${title}" data-cart-remove="${line.id}">
                <img src="${removeIcon}" alt="" class="w-5">
              </button>
            </div>

            <div class="flex items-center justify-between gap-4">
              <p class="text-2xl font-semibold">${price}</p>
              <div class="flex h-6 items-center rounded-full border border-white px-3 text-sm font-semibold">
                <button type="button" class="px-1" aria-label="Decrease ${title} quantity" data-cart-line-minus="${line.id}" data-line-quantity="${line.quantity}">-</button>
                <span class="px-2">${line.quantity}</span>
                <button type="button" class="px-1" aria-label="Increase ${title} quantity" data-cart-line-plus="${line.id}" data-line-quantity="${line.quantity}">+</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  const refresh = async () => {
    try {
      currentCart = await fetchCart();
    } catch (error) {
      console.error('Failed to fetch cart', error);
      currentCart = null;
    }
    render();
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', openCart);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeCart);
  });

  backdrop.addEventListener('click', closeCart);

  checkoutButton?.addEventListener('click', () => {
    if (!currentCart?.checkoutUrl) return;
    window.location.href = currentCart.checkoutUrl;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCart();
    }
  });

  itemsContainer.addEventListener('click', async (event) => {
    const removeButton = event.target.closest('[data-cart-remove]');
    const minusButton = event.target.closest('[data-cart-line-minus]');
    const plusButton = event.target.closest('[data-cart-line-plus]');

    if (!removeButton && !minusButton && !plusButton) return;

    try {
      if (removeButton) {
        currentCart = await removeLine(removeButton.dataset.cartRemove);
      } else if (minusButton) {
        const lineId = minusButton.dataset.cartLineMinus;
        const newQty = Number(minusButton.dataset.lineQuantity) - 1;
        currentCart = await updateLineQuantity(lineId, newQty);
      } else if (plusButton) {
        const lineId = plusButton.dataset.cartLinePlus;
        const newQty = Number(plusButton.dataset.lineQuantity) + 1;
        currentCart = await updateLineQuantity(lineId, newQty);
      }
      render();
    } catch (error) {
      console.error('Cart update failed', error);
    }
  });

  refresh();

  return {
    openCart,
    refresh,
    setCart: (cart) => {
      currentCart = cart;
      render();
    },
  };
};

const cartController = setupCart();

const setupProductPage = async () => {
  const productPage = document.querySelector('[data-product-page]');
  if (!productPage) return;

  const handle = productPage.dataset.productHandle;
  if (!handle) return;

  const quantityValue = document.querySelector('[data-quantity-value]');
  const minusButton = document.querySelector('[data-quantity-minus]');
  const plusButton = document.querySelector('[data-quantity-plus]');
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
  const titleElements = document.querySelectorAll('[data-product-title]');
  const priceElements = document.querySelectorAll('[data-product-price]');

  let quantity = 1;
  let variantId = null;

  const renderQuantity = () => {
    if (!quantityValue) return;
    quantityValue.textContent = quantity;
    if (minusButton) {
      minusButton.disabled = quantity === 1;
      minusButton.classList.toggle('opacity-40', quantity === 1);
    }
  };

  minusButton?.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    renderQuantity();
  });

  plusButton?.addEventListener('click', () => {
    quantity += 1;
    renderQuantity();
  });

  try {
    const product = await fetchProductByHandle(handle);

    if (!product) {
      console.error(`Product "${handle}" not found in Shopify`);
      addToCartButtons.forEach((button) => {
        button.textContent = 'unavailable';
      });
      return;
    }

    const variant = product.variants?.nodes?.find((v) => v.availableForSale) || product.variants?.nodes?.[0];

    if (!variant) {
      addToCartButtons.forEach((button) => {
        button.textContent = 'out of stock';
      });
      return;
    }

    variantId = variant.id;

    titleElements.forEach((element) => {
      element.textContent = product.title;
    });

    priceElements.forEach((element) => {
      element.textContent = formatMoney(variant.price.amount, variant.price.currencyCode);
    });

    addToCartButtons.forEach((button) => {
      button.disabled = !variant.availableForSale;
      button.textContent = variant.availableForSale ? 'add to cart' : 'out of stock';
    });
  } catch (error) {
    console.error('Failed to load product', error);
    addToCartButtons.forEach((button) => {
      button.textContent = 'error';
    });
    return;
  }

  renderQuantity();

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      if (!variantId) return;

      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'adding…';

      try {
        const cart = await addToCart(variantId, quantity);
        cartController?.setCart(cart);
        cartController?.openCart();
        button.textContent = 'added';
      } catch (error) {
        console.error('Add to cart failed', error);
        button.textContent = 'error';
      }

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  });
};

setupProductPage();
