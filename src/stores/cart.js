import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../api/axios'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  async function fetchCart() {
    loading.value = true
    try {
      const response = await axios.get('/cart')
      items.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      loading.value = false
    }
  }

  async function addItem(productId, quantity = 1) {
    try {
      const response = await axios.post('/cart/add', {
        product_id: productId,
        quantity
      })
      items.value.push(response.data.data)
      return true
    } catch (error) {
      console.error('Failed to add item:', error)
      return false
    }
  }

  async function updateItem(cartItemId, quantity) {
    try {
      await axios.put(`/cart/${cartItemId}`, { quantity })
      const item = items.value.find(i => i.id === cartItemId)
      if (item) item.quantity = quantity
    } catch (error) {
      console.error('Failed to update item:', error)
    }
  }

  async function removeItem(cartItemId) {
    try {
      await axios.delete(`/cart/${cartItemId}`)
      items.value = items.value.filter(i => i.id !== cartItemId)
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  async function clearCart() {
    try {
      await axios.post('/cart/clear')
      items.value = []
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }

  return {
    items,
    total,
    itemCount,
    loading,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart
  }
})
