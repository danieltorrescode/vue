export default {
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    authenticate: function (json) {
      console.log(json);
      if ('token' in this.response) {
        let token = this.response.token;
        let user = this.response.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.showMessage(this.response.text, 'success');

        this.$store.commit('setUser');
        this.$router.push('/');
      } else {
        this.showMessage(this.response.text, 'error');
      }
    },
    logout(message) {
      localStorage.removeItem('token');
      localStorage.setItem('user', '{}');
      this.$store.commit('setUser');
      this.$router.push('/');
      this.showMessage(message, 'error');
    },
    showMessage(message, type) {
      this.$store.commit('setMessageColor', type);
      this.$store.commit('setMessageShow', true);
      this.$store.commit('setMessageText', message);
      this.$store.dispatch('cleanMessage');
    },
  },
};
