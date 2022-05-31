<template>
  <v-app-bar
    color="teal-darken-4"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{$App.title}}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <router-link to="/signup">Sing Up</router-link> |
    <router-link to="/login">Log In</router-link> |
    <a href="" v-on:click="logout">Log out</a> |
    <router-link to="/about">About</router-link>|
    <router-link to="/tasks">Tasks</router-link>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  components: {},
  created() {
    // this.$store.commit('setUser');
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
