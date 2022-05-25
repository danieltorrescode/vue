<template>
  <div>
      <br />
      <label for="email">E-mail</label>
      <input type="email" name="" id="email" v-model="email" />
      <br />

      <label for="password">Password</label>
      <input type="password" name="" id="password" v-model="password" />

      <br />
      <button @click="login">Submit</button>
      <br />
      <button @click="cancel('cancel')">Cancel</button>
  </div>
</template>

<script>
import authMixin from '@/mixins/auth';
import formMixin from '@/mixins/form';
import rulesMixin from '@/mixins/rules';

export default {
  mixins: [authMixin, formMixin, rulesMixin],
  data: () => ({
    resource: 'users/login',
    email: '',
    password: '',
  }),
  computed: {
    url() {
      return `${this.$App.baseUrl}/${this.resource}/`;
    },
  },
  methods: {
    cancel: function(x){
      alert(x);
    },
    afterValidate: function () {
      this.login();
    },
    login: async function () {
      let data = {
        email: this.email.trim(),
        password: this.password.trim(),
      };

      let content = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          /* Authorization: `${localStorage.getItem('token')}`, */
        },
        body: JSON.stringify(data),
      };

      fetch(this.url, content)
        .then((response) => response.json())
        .then((json) => this.authenticate(json))
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>
