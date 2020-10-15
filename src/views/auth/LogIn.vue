<template>
  <v-form ref="form" v-model="formValid" lazy-validation>
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 md4>
          <v-text-field
            v-model="email"
            :rules="rules.email"
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="password"
            :counter="10"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-flex>

        <v-btn :disabled="!formValid" color="success" @click="validate">
          Submit
        </v-btn>

        <v-btn color="error" @click="formReset"> Cancel </v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import authMixin from '~/mixins/auth';
import formMixin from '~/mixins/form';
import rulesMixin from '~/mixins/rules';

export default {
  mixins: [authMixin, formMixin, rulesMixin],
  data: () => ({
    resource: 'users/login',
    email: '',
    password: '',
  }),
  computed: {
    url() {
      return `${this.$App.baseUrl}/${this.resource}`;
    },
  },
  methods: {
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
