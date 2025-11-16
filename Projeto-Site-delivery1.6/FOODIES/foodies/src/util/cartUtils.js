export const calculateCartTotals = (cartItems, quantities) => {
  // cálculos
  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const shipping = subtotal === 0 ? 0 : 18;
  const tax = subtotal * 0.1; // 10%
  const total = subtotal + shipping + tax;

return {subtotal, shipping, tax, total};

}