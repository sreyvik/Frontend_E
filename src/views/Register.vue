<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1a2332] to-[#2563eb] flex items-center justify-center py-12 px-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-4xl font-bold text-center text-[#1a2332] mb-2">ShopHub</h1>
      <p class="text-center text-gray-600 mb-8">Join our community!</p>
      <h2 class="text-2xl font-bold text-center text-[#1a2332] mb-8">Create Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Full Name</label>
          <input v-model="form.name" type="text" placeholder="Your name" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Email Address</label>
          <input v-model="form.email" type="email" placeholder="your@email.com" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Password</label>
          <input v-model="form.password" type="password" placeholder="Minimum 8 characters" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div>
          <label class="block font-semibold text-[#1a2332] mb-2">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Confirm password" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" required />
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" 
                class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Creating Account...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-[#2563eb] hover:underline font-semibold">Login here</router-link>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password
    })
    router.push('/login')
  } catch (err) {
    error.value = 'Registration failed. Email may already exist.'
  } finally {
    loading.value = false
  }
}
</script>