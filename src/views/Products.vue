<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">Products</h1>

    <div class="grid grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="col-span-1 bg-white rounded-xl p-6 h-fit shadow-md border border-gray-100">
        <h3 class="font-bold text-lg text-[#1a2332] mb-4">Filters</h3>

        <div class="mb-6">
          <label class="block font-semibold text-[#1a2332] mb-2">Sort By</label>
          <select v-model="productStore.sortBy" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Category</label>
          <div class="space-y-2">
            <button @click="productStore.selectedCategory = null"
              :class="['w-full text-left px-3 py-2 rounded-lg transition-colors', !productStore.selectedCategory ? 'bg-[#2563eb] text-white' : 'hover:bg-gray-100 text-[#1a2332]']">
              All Categories
            </button>
            <button v-for="cat in categories" :key="cat.id" @click="productStore.selectedCategory = cat.id"
              :class="['w-full text-left px-3 py-2 rounded-lg transition-colors', productStore.selectedCategory === cat.id ? 'bg-[#2563eb] text-white' : 'hover:bg-gray-100 text-[#1a2332]']">
              {{ cat.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="col-span-3">
        <div v-if="productStore.loading" class="text-center py-8 text-gray-600">Loading products...</div>
        <div v-else-if="productStore.filteredProducts.length === 0" class="text-center py-8 text-gray-500">
          No products found
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard v-for="product in productStore.filteredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '../components/product/ProductCard.vue'
import { useProductStore } from '../stores/products.js'
import axios from '../api/axios'

const productStore = useProductStore()
const categories = ref([])

onMounted(async () => {
  try {
    if (productStore.products.length === 0) {
      await productStore.fetchProducts()
    }
    const res = await axios.get('/categories')
    categories.value = res.data.data
  } catch (error) {
    console.error('Failed to load products:', error)
  }
})
</script>