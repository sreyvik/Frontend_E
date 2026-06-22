<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">Checkout</h1>

    <div class="grid grid-cols-2 gap-8">
      <!-- Checkout Form -->
      <form @submit.prevent="submitOrder" class="space-y-6">
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 class="text-2xl font-bold text-[#1a2332] mb-4">Shipping Address</h2>
          <div class="space-y-4">
            <input v-model="form.address.street" type="text" placeholder="Street Address" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
            <input v-model="form.address.city" type="text" placeholder="City" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
            <input v-model="form.address.state" type="text" placeholder="State" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
            <input v-model="form.address.zip" type="text" placeholder="ZIP Code" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 class="text-2xl font-bold text-[#1a2332] mb-4">Payment Method</h2>
          <div class="space-y-3">
            <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input v-model="form.paymentMethod" type="radio" value="credit_card" required class="accent-[#2563eb]" />
              <span class="font-medium text-[#1a2332]">Credit Card</span>
            </label>
            <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input v-model="form.paymentMethod" type="radio" value="debit_card" class="accent-[#2563eb]" />
              <span class="font-medium text-[#1a2332]">Debit Card</span>
            </label>
            <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <input v-model="form.paymentMethod" type="radio" value="paypal" class="accent-[#2563eb]" />
              <span class="font-medium text-[#1a2332]">PayPal</span>
            </label>
          </div>
        </div>

        <button type="submit" :disabled="loading" 
                class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-lg">
          {{ loading ? 'Processing...' : 'Place Order' }}
        </button>
      </form>

      <!-- Order Summary -->
      <div class="bg-white rounded-xl p-6 shadow-md h-fit border border-gray-100">
        <h2 class="text-2xl font-bold text-[#1a2332] mb-4">Order Summary</h2>
        <div class="space-y-4 mb-6 border-b border-gray-200 pb-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm text-[#1a2332]">
            <span>{{ item.product.name }} x{{ item.quantity }}</span>
            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="space-y-2 text-sm text-[#1a2332] mb-4">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Tax (10%):</span>
            <span>${{ (cartStore.total * 0.1).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-green-600 font-semibold">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold text-[#1a2332]">
          <span>Total:</span>
          <span>${{ (cartStore.total * 1.1).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import axios from '../api/axios'

const router = useRouter()
const cartStore = useCartStore()
const loading = ref(false)

const form = reactive({
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  paymentMethod: 'credit_card'
})

async function submitOrder() {
  loading.value = true
  try {
    const res = await axios.post('/checkout', {
      shipping_address: form.address,
      payment_method: form.paymentMethod
    })
    alert('Order placed successfully!')
    await cartStore.clearCart()
    router.push(`/orders`)
  } catch (error) {
    alert('Failed to place order: ' + error.response?.data?.message)
  } finally {
    loading.value = false
  }
}
</script>