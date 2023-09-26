import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(item) {
      this.cartItems.push(item);
    },
    removeFromCart(item) {
      const index = this.cartItems.findIndex((cartItem) => cartItem.name === item.name);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
  },
});

export default useCartStore;