export function updateBasketCount() {
  const basketNumber = document.querySelector('.basket-number');
  const products = JSON.parse(localStorage.getItem(window.PRODUCT_LS)) || [];
  const totalQuantity = products.reduce((acc, { qty }) => acc + qty, 0);
  if (basketNumber) basketNumber.textContent = totalQuantity;
}
