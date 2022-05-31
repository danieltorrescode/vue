<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4" align-self="center">
        <h1>Home</h1>
        <br />
        <img :src="logo" height="200" halt="" />
      </v-col>
      <v-col cols="12" md="4"> </v-col>
    </v-row>
  </v-container>

  <div class="flex justify-center"></div>
</template>
<script>
import logo from '@/assets/logo.png';

export default {
  name: 'Home',

  data: () => ({
    logo,
  }),
};
</script>
