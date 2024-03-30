<template>
  <div>index</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'admin'],
  title: '設定管理員',
})
</script>
