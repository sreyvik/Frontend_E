<template>
  <footer class="bg-[#1a2332] text-white py-12 mt-18">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="text-2xl font-bold mb-4"><span class="text-[#60a5fa]">SHOP</span>HUB</h3>
          <p class="text-gray-400">Your trusted online shopping destination for quality products.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-4">Quick Links</h4>
          <ul class="text-gray-400 space-y-2">
            <li><router-link to="/" class="hover:text-white transition-colors">Home</router-link></li>
            <li><router-link to="/products" class="hover:text-white transition-colors">Products</router-link></li>
            <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-4">Contact</h4>
          <p class="text-gray-400">Email: info@shophub.com</p>
          <p class="text-gray-400">Phone: 1-800-SHOP-HUB</p>
          <p class="text-gray-400">Address: 123 Shopping St, City</p>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>&copy; 2026 ShopHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>