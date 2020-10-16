<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-flex>
            <v-text-field
              v-model="form.name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="form.description"
              :counter="10"
              label="Description"
              required
            ></v-text-field>
          </v-flex>

          <v-btn :disabled="!formValid" color="success" @click="validate">
            <template v-if="isAdding"> Submit </template>
            <template v-else> Update </template>
          </v-btn>

          <v-btn color="error" @click="formReset"> Cancel </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import formMixin from '~/mixins/form';
import rulesMixin from '~/mixins/rules';

export default {
  mixins: [formMixin, rulesMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
    },
  }),
  methods: {
    addTask: async function () {
      let content = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(this.form),
      };

      fetch(this.formResource, content)
        .then((response) => response.json())
        .then((json) => {
          if (json.task._id) {
            // this.showMessage(this.response.text, 'success');
            this.$emit('updateList', json.task);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          this.showMessage('Error', 'error');
        });

      this.formReset();
    },
    editTask: async function () {
      let formResource = `${this.formResource}/${this.formSelected._id}`;
      let content = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(this.form),
      };

      fetch(formResource, content)
        .then((response) => response.json())
        .then((json) => {
          if (json.task._id) {
            // this.showMessage(this.response.text, 'success');
            this.$emit('updateList', json.task);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          this.showMessage('Error', 'error');
        });

      this.formReset();
    },
  },
};
</script>
