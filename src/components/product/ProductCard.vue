<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative overflow-hidden bg-gray-200 h-72">
      <img :src="product.image || 'https://via.placeholder.com/300x200?text=No+Image'" :alt="product.name"
        class="w-full h-full object-cover hover:scale-110 transition-transform" />
      <div v-if="product.stock === 0" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span class="text-white font-bold">Out of Stock</span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>

      <div class="flex justify-between items-center mb-4">
        <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
        <div v-if="product.reviews" class="flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm">{{ (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length || 0).toFixed(1) }}</span>
        </div>
      </div>

      <div class="flex gap-2">
        <button @click="addToCart" v-if="product.stock > 0" class="btn-primary flex-1">
          Add to Cart
        </button>
        <button @click="toggleWishlist" class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          {{ inWishlist ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/cart.js'
import { useWishlistStore } from '../../stores/wishlist.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const inWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

async function addToCart() {
  const success = await cartStore.addItem(props.product.id, 1)
  if (success) {
    alert('Added to cart!')
  }
}

async function toggleWishlist() {
  if (inWishlist.value) {
    const item = wishlistStore.items.find(i => i.product_id === props.product.id)
    if (item) await wishlistStore.removeItem(item.id)
  } else {
    await wishlistStore.addItem(props.product.id)
  }
}
</script>
