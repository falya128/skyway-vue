<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const cognitoLogin = inject('cognitoLogin')

const login = () => {
  errorMessage.value = ''
  cognitoLogin(username.value, password.value)
    .then(() => {
      router.push({ path: '/skyway' })
    })
    .catch(() => {
      errorMessage.value = 'Failed login attempt.'
    })
}
</script>

<template>
  <form @submit.prevent="login()">
    <div>
      <label>username</label>
      <input type="text" v-model="username" required />
    </div>
    <div>
      <label>password</label>
      <input type="password" v-model="password" required />
    </div>
    <button type="submit">Login</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </form>
</template>
