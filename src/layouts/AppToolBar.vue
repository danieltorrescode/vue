<template>
  <div class="toolbar">
    <div id="nav">
      <router-link to="/signup">Sing Up</router-link> |
      <router-link to="/login">Log In</router-link> |
      <a href="" v-on:click="logout">Log out</a> |
      <router-link to="/about">About</router-link>|
      <router-link to="/tasks">Tasks</router-link>
    </div>
  </div>
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
