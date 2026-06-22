<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">My Orders</h1>

    <div v-if="orderStore.orders.length === 0" class="text-center py-12 text-gray-500">
      No orders yet. <router-link to="/products" class="text-[#2563eb] hover:underline font-semibold">Start shopping</router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orderStore.orders" :key="order.id" class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-bold text-lg text-[#1a2332]">Order #{{ order.id }}</h3>
            <p class="text-gray-600">{{ new Date(order.created_at).toLocaleDateString() }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-[#2563eb]">${{ order.total_amount }}</p>
            <span :class="['px-3 py-1 rounded-lg text-sm font-semibold', order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <p class="font-semibold text-[#1a2332] mb-2">Items:</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li v-for="item in order.items" :key="item.id">
              {{ item.product.name }} x{{ item.quantity }} - ${{ item.price }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '../stores/orders.js'

const orderStore = useOrderStore()

onMounted(async () => {
  if (orderStore.orders.length === 0) {
    await orderStore.fetchOrders()
  }
})
</script>