<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import cognito from '@/utils/cognito'

const errorMessage = ref('')
const username = ref('')
const password = ref('')

const router = useRouter()
const login = () => {
  errorMessage.value = ''
  cognito
    .login(username.value, password.value)
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
