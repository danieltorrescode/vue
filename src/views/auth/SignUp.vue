<template>
  <v-container align-center>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field
            v-model="firstName"
            :counter="10"
            :rules="rules.user"
            label="Firts Name"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="lastName"
            :counter="10"
            :rules="rules.user"
            label="Last Name"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="email"
            :rules="rules.email"
            label="E-mail"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="password"
            :counter="10"
            label="Password"
            type="password"
            required
          >
          </v-text-field>

          <v-btn :disabled="!formValid" color="success" @click="validate">
            Submit
          </v-btn>

          <v-btn color="error" @click="formReset"> Cancel </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authMixin from '~/mixins/auth';
import formMixin from '~/mixins/form';
import rulesMixin from '~/mixins/rules';

export default {
  mixins: [authMixin, formMixin, rulesMixin],
  data: () => ({
    resource: 'posts',
    firstName: '',
    lastName: '',
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
      this.signup();
    },
    signup: async function () {
      let data = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        password: this.password.trim(),
        email: this.email.trim(),
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
