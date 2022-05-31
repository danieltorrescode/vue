<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="rules.emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
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
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8"></v-col>
        <v-col cols="12" md="2">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
    show1: false,
    valid: false,
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
          this.login();
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
