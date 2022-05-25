<template>
  <div class="flex justify-center">
    <h1>Home</h1>
    <br>
    <img :src="logo" height="200" halt="">
  </div>
</template>
<script>
import logo from '@/assets/logo.png'

export default {
  name: 'Home',

  data: () => ({
    logo,
  }),
}
</script>
