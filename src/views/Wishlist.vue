<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">My Wishlist</h1>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-xl mb-4">Your wishlist is empty</p>
      <router-link to="/products" class="inline-block bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="item in wishlistStore.items" :key="item.id" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <img :src="item.product.image || 'https://via.placeholder.com/300x200?text=Product'" :alt="item.product.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-[#1a2332] mb-2">{{ item.product.name }}</h3>
          <p class="text-2xl font-bold text-[#2563eb] mb-4">${{ item.product.price }}</p>
          <div class="flex gap-2">
            <button @click="addToCart(item.product.id)" class="flex-1 bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors text-sm">Add to Cart</button>
            <button @click="wishlistStore.removeItem(item.id)" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '../stores/wishlist.js'
import { useCartStore } from '../stores/cart.js'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

onMounted(async () => {
  if (wishlistStore.items.length === 0) {
    await wishlistStore.fetchWishlist()
  }
})

async function addToCart(productId) {
  await cartStore.addItem(productId, 1)
  alert('Added to cart!')
}
</script>