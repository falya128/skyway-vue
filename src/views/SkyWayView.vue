<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = inject('cognitoIsAuthenticated')
const cognitoLogout = inject('cognitoLogout')

isAuthenticated()
  .then(() => {})
  .catch(() => {
    router.push({ path: '/login' })
  })

const logout = () => {
  cognitoLogout()
  router.push('/')
}
</script>

<template>
  <button @click="logout()">Logout</button>
</template>
