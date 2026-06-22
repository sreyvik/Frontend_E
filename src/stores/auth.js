import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "../api/axios"

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const token = ref(localStorage.getItem("auth_token") || null)
    const loading = ref(false)

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.is_admin === true || user.value?.is_admin === 1)

    async function fetchUser() {
        if (!token.value) return
        try {
            loading.value = true
            const response = await api.get("/user")
            user.value = response.data
            if (response.data.is_admin !== undefined) {
                user.value.is_admin = Boolean(response.data.is_admin)
            }
        } catch (error) {
            user.value = null
            token.value = null
            localStorage.removeItem("auth_token")
        } finally {
            loading.value = false
        }
    }

    async function register(data) {
        const response = await api.post("/register", data)
        user.value = response.data.user
        if (user.value) user.value.is_admin = Boolean(user.value.is_admin)
        token.value = response.data.token
        localStorage.setItem("auth_token", token.value)
        return response.data
    }

    async function login(email, password) {
        const response = await api.post("/login", {
            email,
            password
        })
        user.value = response.data.user
        if (user.value) user.value.is_admin = Boolean(user.value.is_admin)
        token.value = response.data.token
        localStorage.setItem("auth_token", token.value)
        return response.data
    }

    async function logout() {
        try {
            await api.post("/logout")
        } catch (error) {
            console.error("Logout error:", error)
        }
        user.value = null
        token.value = null
        localStorage.removeItem("auth_token")
    }

    return {
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        fetchUser,
        register,
        login,
        logout
    }
})
