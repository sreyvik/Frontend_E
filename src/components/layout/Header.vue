<template>
  <header class="bg-[#1a2332] border-b-4 border-[#2563eb] shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-white tracking-tight">
        <span class="text-[#60a5fa]">SHOP</span>HUB
      </router-link>
      <div v-if="authStore.isAuthenticated" class="flex-1 mx-8 hidden md:block">
        <input v-model="productStore.searchQuery" type="text" placeholder="Search products..."
          class="w-full bg-[#2a3a4f] text-white placeholder-gray-400 px-4 py-2.5 rounded-lg border border-[#3a4a5f] focus:outline-none focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all" />
      </div>

      <div class="flex gap-4 items-center">
        <router-link v-if="authStore.isAuthenticated" to="/products"
          class="text-gray-300 font-medium text-sm hover:text-white transition-colors">
          Products
        </router-link>

        <router-link to="/wishlist" class="relative text-gray-300 hover:text-white transition-colors"
          v-if="authStore.isAuthenticated">
          <span class="text-xl">❤️</span>
          <span v-if="wishlistStore.items.length"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a2332]">
            {{ wishlistStore.items.length }}
          </span>
        </router-link>

        <router-link to="/cart" class="relative text-gray-300 hover:text-white transition-colors"
          v-if="authStore.isAuthenticated">
          <span class="text-xl">🛒</span>
          <span v-if="cartStore.itemCount"
            class="absolute -top-2 -right-2 bg-[#2563eb] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a2332]">
            {{ cartStore.itemCount }}
          </span>
        </router-link>

        <router-link v-if="authStore.isAdmin" to="/admin"
          class="bg-[#2563eb] text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-md">
          ⚡ Admin
        </router-link>

        <template v-if="authStore.isAuthenticated">
          <router-link to="/profile"
            class="text-gray-300 font-medium text-sm hover:text-white transition-colors">
            👤 {{ authStore.user?.name?.split(' ')[0] || 'Account' }}
          </router-link>
          <button @click="logout"
            class="bg-red-600 text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-red-700 transition-colors shadow-md">
            Logout
          </button>
        </template>
        <template v-else>
          <router-link v-if="router.currentRoute.value.path !== '/login'
            && router.currentRoute.value.path !== '/register'" to="/login"
            class="bg-[#2563eb] text-white px-6 py-2 font-medium text-sm rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-md">
            Login
          </router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth.js'
import { useCartStore } from '../../stores/cart.js'
import { useWishlistStore } from '../../stores/wishlist.js'
import { useProductStore } from '../../stores/products.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>