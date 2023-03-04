const addToCartButtonElement = document.querySelector(
  '#product-details button'
);
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json', //telling the server to parse this request with the json form data middleware
      },
    });
  } catch (error) {
    alert('Something went wrong 1');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const respondeData = await response.json(); // transformin from json to normal js

  const newTotalQuantity = respondeData.newTotalItems;
  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener('click', addToCart);
