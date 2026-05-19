import './style.css';

const cartStorageKey = 'manyfaces-cart';

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
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: productId,
          title: productTitle,
          price: productPrice,
          quantity,
        });
      }

      writeCart(cart);
      button.textContent = 'added';

      window.setTimeout(() => {
        button.textContent = 'add to cart';
      }, 1200);
    });
  });

  renderQuantity();
};

setupProductPage();
