import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../api/axios'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)

  async function fetchWishlist() {
    loading.value = true
    try {
      const response = await axios.get('/wishlist')
      items.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    } finally {
      loading.value = false
    }
  }

  async function addItem(productId) {
    try {
      const response = await axios.post('/wishlist/add', {
        product_id: productId
      })
      items.value.push(response.data.data)
      return true
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
      return false
    }
  }

  async function removeItem(wishlistItemId) {
    try {
      await axios.delete(`/wishlist/${wishlistItemId}`)
      items.value = items.value.filter(i => i.id !== wishlistItemId)
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    }
  }

  function isInWishlist(productId) {
    return items.value.some(item => item.product_id === productId)
  }

  return {
    items,
    loading,
    fetchWishlist,
    addItem,
    removeItem,
    isInWishlist
  }
})
