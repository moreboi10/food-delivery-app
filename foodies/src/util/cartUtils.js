export const calculateCartTotals = (cartItems,quantities) =>{
    const Subtotal = cartItems.reduce((acc,food) => acc + food.price * quantities[food.id],0);
  const shipping = Subtotal === 0?0.0:10;
  const tax = Subtotal * 0.1; // 10% tax

  const grandtotal = Subtotal + shipping + tax;
   return {Subtotal,shipping,tax,grandtotal};
}