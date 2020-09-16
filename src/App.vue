<template>
  <v-app>
    <v-main>
      <app-toolbar />
      <router-view />
    </v-main>

    <app-message></app-message>
  </v-app>
</template>

<script>
import AppMessage from '~/components/AppMessage.vue';
import AppToolBar from '~/layouts/AppToolBar.vue';

export default {
  name: 'App',
  components: {
    'app-message': AppMessage,
    'app-toolbar': AppToolBar,
  },
  created() {
    this.$store.commit('setUser');
    document.title = this.$App.title;
  },
  data: () => ({}),
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
  },
};
</script>
