<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1a2332] to-[#2563eb] flex items-center justify-center py-12 px-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-4xl font-bold text-center text-[#1a2332] mb-2">ShopHub</h1>
      <p class="text-center text-gray-600 mb-8">Welcome back!</p>
      <h2 class="text-2xl font-bold text-center text-[#1a2332] mb-8">Login to Your Account</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Email Address</label>
          <input v-model="form.email" type="email" placeholder="your@email.com" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Password</label>
          <input v-model="form.password" type="password" placeholder="Enter your password" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" 
                class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-[#2563eb] hover:underline font-semibold">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.email, form.password)
    router.push('/')
  } catch (err) {
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>