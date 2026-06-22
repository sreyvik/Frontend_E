import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../api/axios'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([])
  const loading = ref(false)

  async function fetchOrders() {
    loading.value = true
    try {
      const response = await axios.get('/orders')
      orders.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      loading.value = false
    }
  }

  async function getOrderDetails(orderId) {
    try {
      const response = await axios.get(`/orders/${orderId}`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch order details:', error)
      return null
    }
  }

  return {
    orders,
    loading,
    fetchOrders,
    getOrderDetails
  }
})
