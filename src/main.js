import './style.css';
import cartProductImage from './assets/img/Frame 3.png';
import removeIcon from './assets/img/delete_forever.svg';

const cartStorageKey = 'manyfaces-cart';
const defaultProductImage = cartProductImage;
const defaultProductSubtitle = 'Art toy (25cm x 18cm x 18cm)';

const readCart = () => {
  const savedCart = localStorage.getItem(cartStorageKey);

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
};

const writeCart = (cart) => {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
};

const formatPrice = (price) => `R${price}`;

const getCartTotal = (cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0);

const getCartItemCount = (cart) => cart.reduce((total, item) => total + item.quantity, 0);

const getCartItemImage = (item) => {
  if (!item.image || item.image.startsWith('src/')) {
    return defaultProductImage;
  }

  return item.image;
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
    return;
  }

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

  const renderCart = () => {
    const cart = readCart();
    const itemCount = getCartItemCount(cart);

    countElements.forEach((element) => {
      element.textContent = itemCount;
    });

    emptyMessage.classList.toggle('hidden', cart.length > 0);
    subtotalElement.textContent = formatPrice(getCartTotal(cart));

    if (checkoutButton) {
      checkoutButton.disabled = cart.length === 0;
      checkoutButton.textContent = cart.length === 0 ? 'Cart empty' : 'Checkout';
    }

    itemsContainer.innerHTML = cart.map((item) => `
      <article class="grid grid-cols-[minmax(0,1fr)_8.75rem] items-end gap-5">
        <img src="${getCartItemImage(item)}" alt="${item.title}" class="h-40 w-full self-end object-contain object-bottom">

        <div class="grid gap-1 pb-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-5xl font-semibold leading-none">${item.title}</h3>
              <p class="font-sans text-[10px] leading-4">${item.subtitle || defaultProductSubtitle}</p>
            </div>

            <button type="button" aria-label="Remove ${item.title}" data-cart-remove="${item.id}">
              <img src="${removeIcon}" alt="" class="w-5">
            </button>
          </div>

          <div class="flex items-center justify-between gap-4">
            <p class="text-2xl font-semibold">${formatPrice(item.price)}</p>
            <div class="flex h-6 items-center rounded-full border border-white px-3 text-sm font-semibold">
              <button type="button" class="px-1" aria-label="Decrease ${item.title} quantity" data-cart-line-minus="${item.id}">-</button>
              <span class="px-2">${item.quantity}</span>
              <button type="button" class="px-1" aria-label="Increase ${item.title} quantity" data-cart-line-plus="${item.id}">+</button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', openCart);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeCart);
  });

  backdrop.addEventListener('click', closeCart);

  checkoutButton?.addEventListener('click', () => {
    if (readCart().length === 0) {
      return;
    }

    window.location.href = '/checkout.html';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCart();
    }
  });

  itemsContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-cart-remove]');
    const minusButton = event.target.closest('[data-cart-line-minus]');
    const plusButton = event.target.closest('[data-cart-line-plus]');

    if (!removeButton && !minusButton && !plusButton) {
      return;
    }

    const productId = removeButton?.dataset.cartRemove || minusButton?.dataset.cartLineMinus || plusButton?.dataset.cartLinePlus;
    const cart = readCart();
    const item = cart.find((cartItem) => cartItem.id === productId);

    if (!item) {
      return;
    }

    if (removeButton) {
      writeCart(cart.filter((cartItem) => cartItem.id !== productId));
      renderCart();
      return;
    }

    if (minusButton) {
      item.quantity -= 1;
    }

    if (plusButton) {
      item.quantity += 1;
    }

    writeCart(cart.filter((cartItem) => cartItem.quantity > 0));
    renderCart();
  });

  renderCart();

  return {
    openCart,
    renderCart,
  };
};

const cartController = setupCart();

const setupCheckoutPage = () => {
  const checkoutPage = document.querySelector('[data-checkout-page]');
  const itemsContainer = document.querySelector('[data-checkout-items]');
  const emptyMessage = document.querySelector('[data-checkout-empty]');
  const subtotalElement = document.querySelector('[data-checkout-subtotal]');
  const totalElement = document.querySelector('[data-checkout-total]');
  const paymentSubmitButton = document.querySelector('[data-payment-submit]');
  const paymentChoiceButtons = document.querySelectorAll('[data-payment-choice]');

  if (!checkoutPage || !itemsContainer || !emptyMessage || !subtotalElement || !totalElement) {
    return;
  }

  const cart = readCart();
  const total = getCartTotal(cart);

  emptyMessage.classList.toggle('hidden', cart.length > 0);
  subtotalElement.textContent = formatPrice(total);
  totalElement.textContent = formatPrice(total);

  if (paymentSubmitButton) {
    paymentSubmitButton.disabled = cart.length === 0;
    paymentSubmitButton.textContent = cart.length === 0 ? 'Cart empty' : 'Continue to payment';

    paymentSubmitButton.addEventListener('click', () => {
      if (readCart().length === 0) {
        return;
      }

      paymentSubmitButton.textContent = 'Payment setup coming next';
    });
  }

  itemsContainer.innerHTML = cart.map((item) => `
    <article class="grid grid-cols-[6rem_minmax(0,1fr)] items-end gap-4">
      <img src="${getCartItemImage(item)}" alt="${item.title}" class="h-24 w-full object-contain object-bottom">

      <div>
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-4xl font-semibold leading-none">${item.title}</h3>
            <p class="font-sans text-[10px] leading-4">${item.subtitle || defaultProductSubtitle}</p>
          </div>
          <p class="text-2xl font-semibold">${formatPrice(item.price * item.quantity)}</p>
        </div>

        <p class="mt-1 font-sans text-xs text-white/70">Qty ${item.quantity}</p>
      </div>
    </article>
  `).join('');

  paymentChoiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.parentElement;

      parent?.querySelectorAll('[data-payment-choice]').forEach((choice) => {
        choice.classList.remove('bg-black', 'text-white');
        choice.classList.add('border', 'border-black');
      });

      button.classList.add('bg-black', 'text-white');
      button.classList.remove('border', 'border-black');
    });
  });
};

const setupProductPage = () => {
  const quantityControl = document.querySelector('[data-product-quantity]');
  const quantityValue = document.querySelector('[data-quantity-value]');
  const minusButton = document.querySelector('[data-quantity-minus]');
  const plusButton = document.querySelector('[data-quantity-plus]');
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');

  if (!quantityControl || !quantityValue || !minusButton || !plusButton || addToCartButtons.length === 0) {
    return;
  }

  let quantity = 1;

  const renderQuantity = () => {
    quantityValue.textContent = quantity;
    minusButton.disabled = quantity === 1;
    minusButton.classList.toggle('opacity-40', quantity === 1);
  };

  minusButton.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    renderQuantity();
  });

  plusButton.addEventListener('click', () => {
    quantity += 1;
    renderQuantity();
  });

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cart = readCart();
      const productId = button.dataset.productId;
      const productTitle = button.dataset.productTitle;
      const productPrice = Number(button.dataset.productPrice);
      const productImage = button.dataset.productImage || defaultProductImage;
      const productSubtitle = button.dataset.productSubtitle || defaultProductSubtitle;
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.image = productImage;
        existingItem.subtitle = productSubtitle;
      } else {
        cart.push({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          subtitle: productSubtitle,
          quantity,
        });
      }

      writeCart(cart);
      cartController?.renderCart();
      cartController?.openCart();
      button.textContent = 'added';

      window.setTimeout(() => {
        button.textContent = 'add to cart';
      }, 1200);
    });
  });

  renderQuantity();
};

setupProductPage();
setupCheckoutPage();
