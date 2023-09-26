<script setup>
import { useCartStore } from '@/stores/cart';
import { ref, computed } from 'vue'; 

const cartStore = useCartStore();

// 這邊檢查是否已加入購物車 如果沒有初始值就是 1
const addToCart = (item) => {
  const existingItem = cartStore.cartItems.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1; 
    cartStore.addToCart(item);
  }
};


// 使用 computed 算總金額
const totalAmount = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

// 使用 computed 算數量
const cartItemCount = computed(() => {
  return cartStore.cartItems.length;
});

// 新增數量
const increaseQuantity = (item) => {
  item.quantity++;
};

// 减少數量
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};
// 移除商品
const removeItem = (item) => {
  cartStore.removeFromCart(item);
};
</script>

<template>
  <h1>葉大雄的房間</h1>
  <br>
  <div>
    <div>
      <span>多拉A夢</span>
      <span>$50</span>
      <button @click="addToCart({ name: '多拉A夢', price: 50 })">加入到清單</button>
    </div>
    <div>
      <span>多拉B夢</span>
      <span>$100</span>
      <button @click="addToCart({ name: '多拉B夢', price: 100 })">加入到清單</button>
    </div>
    <div>
      <span>多拉C夢</span>
      <span>$150</span>
    <button @click="addToCart({ name: '多拉C夢', price: 150 })">加入到清單</button>
    </div>
  </div>

  <div>
    <div class=totalPrice>
        <h2>購物清單</h2>
        <span>{{ cartItemCount }}</span>
        <h3>總金額:</h3>
        <span>{{ totalAmount }}</span>
    </div>

    <div class=list>
      <div v-for="(item, index) in cartStore.cartItems" :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
        <span>數量{{item.quantity}}</span>
        <button @click="increaseQuantity(item)">+</button>
        <button @click="decreaseQuantity(item)">-</button>
        <button @click="removeItem(item)">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .totalPrice{
    display: flex;
  }
</style>