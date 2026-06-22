import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../api/axios'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const selectedCategory = ref(null)
  const searchQuery = ref('')
  const sortBy = ref('newest')
  const loading = ref(false)

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (selectedCategory.value) {
      filtered = filtered.filter(p => p.category_id === selectedCategory.value)
    }

    if (searchQuery.value) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    if (sortBy.value === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy.value === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  })

  async function fetchProducts() {
    loading.value = true
    try {
      const response = await axios.get('/products?per_page=50')
      products.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    filteredProducts,
    loading,
    selectedCategory,
    searchQuery,
    sortBy,
    fetchProducts
  }
})
