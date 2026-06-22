<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-[#1a2332] to-[#2563eb] text-white py-24">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
        <p class="text-xl text-blue-100 mb-8">Your one-stop shop for quality products at great prices</p>
        <router-link to="/products" class="inline-block bg-white text-[#1a2332] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
          Shop Now
        </router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-[#1a2332] mb-8">Featured Products</h2>
      <div v-if="loading" class="text-center py-8 text-gray-600">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-[#1a2332] mb-8">Popular Categories</h2>
        <div v-if="loading" class="text-center text-gray-600">Loading...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="category in categories" :key="category.id" 
               class="bg-white rounded-xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <h3 class="text-xl font-bold text-[#1a2332] mb-2">{{ category.name }}</h3>
            <p class="text-gray-600">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/product/ProductCard.vue'
import axios from '../api/axios'

const categories = ref([])
const products = ref([])
const loading = ref(false)

const featuredProducts = computed(() => products.value.slice(0, 4))

onMounted(async () => {
  loading.value = true
  try {
    const [catRes, prodRes] = await Promise.all([
      axios.get('/categories'),
      axios.get('/products?per_page=20')
    ])
    categories.value = catRes.data.data
    products.value = prodRes.data.data
  } catch (error) {
    console.error('Failed to load home data:', error)
  } finally {
    loading.value = false
  }
})
</script>