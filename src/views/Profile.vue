<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#1a2332] mb-8">My Profile</h1>

    <div class="grid grid-cols-2 gap-8">
      <!-- Profile Info -->
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 class="text-2xl font-bold text-[#1a2332] mb-6">Account Information</h2>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label class="block font-semibold text-[#1a2332] mb-2">Name</label>
            <input v-model="form.name" type="text" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
          <div>
            <label class="block font-semibold text-[#1a2332] mb-2">Email</label>
            <input v-model="form.email" type="email" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
          <button type="submit" class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Update Profile</button>
        </form>
      </div>

      <!-- Change Password -->
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 class="text-2xl font-bold text-[#1a2332] mb-6">Change Password</h2>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block font-semibold text-[#1a2332] mb-2">Current Password</label>
            <input v-model="passwordForm.current" type="password" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
          <div>
            <label class="block font-semibold text-[#1a2332] mb-2">New Password</label>
            <input v-model="passwordForm.new" type="password" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
          <div>
            <label class="block font-semibold text-[#1a2332] mb-2">Confirm Password</label>
            <input v-model="passwordForm.confirm" type="password" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent" required />
          </div>
          <button type="submit" class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md">Change Password</button>
        </form>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <h2 class="text-2xl font-bold text-[#1a2332] mb-6">Quick Links</h2>
      <div class="flex gap-4">
        <router-link to="/orders" class="bg-gray-100 text-[#1a2332] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">View Orders</router-link>
        <router-link to="/wishlist" class="bg-gray-100 text-[#1a2332] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">View Wishlist</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import axios from '../api/axios'

const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: ''
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

onMounted(async () => {
  try {
    const res = await axios.get('/profile')
    form.name = res.data.data.name
    form.email = res.data.data.email
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
})

async function updateProfile() {
  try {
    await axios.put('/profile', {
      name: form.name,
      email: form.email
    })
    alert('Profile updated!')
  } catch (error) {
    alert('Failed to update profile: ' + error.response?.data?.message)
  }
}

async function changePassword() {
  if (passwordForm.new !== passwordForm.confirm) {
    alert('Passwords do not match')
    return
  }
  try {
    await axios.post('/profile/change-password', {
      current_password: passwordForm.current,
      new_password: passwordForm.new,
      new_password_confirmation: passwordForm.confirm
    })
    alert('Password changed!')
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
  } catch (error) {
    alert('Failed to change password: ' + error.response?.data?.message)
  }
}
</script>