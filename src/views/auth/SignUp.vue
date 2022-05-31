<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="firstName"
        :counter="10"
        :rules="nameRules"
        label="firstName"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        :counter="10"
        :rules="nameRules"
        label="lastName"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <!-- <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn> -->
    </v-form>
  </v-container>
</template>

<script>
import authMixin from '@/mixins/auth';
import formMixin from '@/mixins/form';
import rulesMixin from '@/mixins/rules';

export default {
  mixins: [authMixin, formMixin, rulesMixin],
  data: () => ({
    resource: 'users',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    show1: false,
  }),
  computed: {
    url() {
      return `${this.$App.baseUrl}/${this.resource}/`;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate().then((result) => {
        if (result.valid == true) {
          this.signup();
        }
      });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    afterValidate: function () {
      this.signup();
    },
    signup: async function () {
      let data = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        password: this.password.trim(),
        email: this.email.trim(),
        username: this.email.trim(),
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
