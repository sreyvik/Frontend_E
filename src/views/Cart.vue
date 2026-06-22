<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-xl mb-4">Your cart is empty</p>
      <router-link to="/products" class="inline-block bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.id" class="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex gap-6">
          <img :src="item.product.image || 'https://via.placeholder.com/100'" :alt="item.product.name" class="w-24 h-24 object-cover rounded-lg" />
          <div class="flex-1">
            <h3 class="font-bold text-lg text-[#1a2332]">{{ item.product.name }}</h3>
            <p class="text-gray-600">{{ item.product.description.substring(0, 100) }}...</p>
            <p class="font-bold text-[#2563eb] mt-2">${{ item.product.price }}</p>
          </div>
          <div class="flex flex-col items-end justify-between">
            <button @click="cartStore.removeItem(item.id)" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">Remove</button>
            <div class="flex items-center gap-2 mt-2">
              <button @click="cartStore.updateItem(item.id, item.quantity - 1)" v-if="item.quantity > 1" class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">-</button>
              <span class="px-4 py-1 border border-gray-300 rounded-lg">{{ item.quantity }}</span>
              <button @click="cartStore.updateItem(item.id, item.quantity + 1)" class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">+</button>
            </div>
            <p class="font-bold text-[#1a2332] mt-2">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="bg-white rounded-xl p-6 shadow-md h-fit border border-gray-100">
        <h2 class="text-2xl font-bold text-[#1a2332] mb-4">Order Summary</h2>
        <div class="space-y-2 mb-4 border-b border-gray-200 pb-4">
          <div class="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Tax (10%):</span>
            <span>${{ (cartStore.total * 0.1).toFixed(2) }}</span>
          </div>
        </div>
        <div class="flex justify-between text-xl font-bold text-[#1a2332] mb-6">
          <span>Total:</span>
          <span>${{ (cartStore.total * 1.1).toFixed(2) }}</span>
        </div>
        <router-link to="/checkout" class="block w-full bg-[#2563eb] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

onMounted(async () => {
  if (cartStore.items.length === 0) {
    await cartStore.fetchCart()
  }
})
</script>