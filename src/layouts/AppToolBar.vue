<template>
  <v-toolbar dense>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div id="nav">
      <router-link to="/signup">Sing Up</router-link> |
      <router-link to="/login">Log In</router-link> |
      <a href="" v-on:click="logout">Log out</a> |
      <router-link to="/about">About</router-link>|
      <router-link to="/tasks">Tasks</router-link>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  components: {},
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
