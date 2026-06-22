<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-12 text-gray-600">Loading...</div>
    <div v-else-if="product" class="grid grid-cols-2 gap-8">
      <!-- Product Image -->
      <div class="bg-gray-50 rounded-xl p-8 h-96 flex items-center justify-center border border-gray-100">
        <img :src="product.image || 'https://via.placeholder.com/400x400?text=Product'" :alt="product.name" class="max-w-full max-h-full" />
      </div>

      <!-- Product Details -->
      <div>
        <h1 class="text-4xl font-bold text-[#1a2332] mb-4">{{ product.name }}</h1>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>

        <div class="mb-8">
          <span class="text-4xl font-bold text-[#2563eb]">${{ product.price }}</span>
          <span v-if="product.stock === 0" class="ml-4 text-red-600 font-bold">Out of Stock</span>
          <span v-else class="ml-4 text-green-600 font-bold">{{ product.stock }} in stock</span>
        </div>

        <div class="flex gap-4 mb-8">
          <button @click="addToCart" v-if="product.stock > 0" class="bg-[#2563eb] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">
            Add to Cart
          </button>
          <button @click="toggleWishlist" class="px-6 py-3 border-2 border-[#2563eb] text-[#2563eb] rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            {{ inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist' }}
          </button>
        </div>

        <!-- Reviews Section -->
        <div class="border-t border-gray-200 pt-8">
          <h2 class="text-2xl font-bold text-[#1a2332] mb-4">Reviews</h2>
          <div v-if="reviews.length === 0" class="text-gray-500">No reviews yet</div>
          <div v-else class="space-y-4 mb-8">
            <div v-for="review in reviews" :key="review.id" class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-bold text-[#1a2332]">{{ review.user.name }}</p>
                  <p class="text-sm text-gray-600">{{ new Date(review.created_at).toLocaleDateString() }}</p>
                </div>
                <span class="text-yellow-500">{{ '⭐'.repeat(review.rating) }}</span>
              </div>
              <p class="mt-2 text-gray-700">{{ review.comment }}</p>
            </div>
          </div>

          <!-- Write Review -->
          <div v-if="isAuthenticated" class="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 class="font-bold text-[#1a2332] mb-4">Write a Review</h3>
            <div class="space-y-4">
              <div>
                <label class="block font-semibold text-[#1a2332] mb-2">Rating</label>
                <select v-model.number="newReview.rating" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent">
                  <option value="">Select rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-[#1a2332] mb-2">Comment</label>
                <textarea v-model="newReview.comment" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" rows="4"></textarea>
              </div>
              <button @click="submitReview" class="bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Submit Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cart.js'
import { useWishlistStore } from '../stores/wishlist.js'
import axios from '../api/axios'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref(null)
const reviews = ref([])
const loading = ref(false)
const newReview = ref({ rating: '', comment: '' })

const isAuthenticated = computed(() => authStore.isAuthenticated)
const inWishlist = computed(() => product.value && wishlistStore.isInWishlist(product.value.id))

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get(`/products/${route.params.id}`)
    product.value = res.data.data
    reviews.value = product.value.reviews || []
  } catch (error) {
    console.error('Failed to load product:', error)
  } finally {
    loading.value = false
  }
})

async function addToCart() {
  if (await cartStore.addItem(product.value.id, 1)) {
    alert('Added to cart!')
  }
}

async function toggleWishlist() {
  if (inWishlist.value) {
    const item = wishlistStore.items.find(i => i.product_id === product.value.id)
    if (item) await wishlistStore.removeItem(item.id)
  } else {
    await wishlistStore.addItem(product.value.id)
  }
}

async function submitReview() {
  if (!newReview.value.rating || !newReview.value.comment) {
    alert('Please fill in all fields')
    return
  }
  try {
    const res = await axios.post('/reviews', {
      product_id: product.value.id,
      rating: newReview.value.rating,
      comment: newReview.value.comment
    })
    reviews.value.push(res.data.data)
    newReview.value = { rating: '', comment: '' }
    alert('Review submitted!')
  } catch (error) {
    alert('Failed to submit review')
  }
}
</script>