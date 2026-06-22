<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

const authStore = useAuthStore()

onMounted(() => {
  // Fetch user on app boot so isAdmin is available for route guards
  authStore.fetchUser()
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}
</style>
