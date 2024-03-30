<template>
  <div class="flex flex-col items-center justify-center">
    <nuxt-img
      src="/ntpusu.jpg"
      format="jpg"
      preload
      class="md:1/3 m-16 w-3/4 max-w-64 cursor-pointer"
      @click="signInWithRedirect(auth, new GoogleAuthProvider())"
    />
    <q-separator
      spaced="lg"
      color="bg-gray-800"
      inset
      class="md:1/3 h-0.5 w-3/4 max-w-72"
    />
    <nuxt-img
      src="/login/google.png"
      format="png"
      preload
      class="md:1/4 m-16 w-3/4 max-w-60 cursor-pointer"
      @click="signInWithRedirect(auth, new GoogleAuthProvider())"
    />
  </div>
</template>

<script lang="ts" setup>
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

definePageMeta({
  title: '登入',
})

const auth = useFirebaseAuth()!
</script>
