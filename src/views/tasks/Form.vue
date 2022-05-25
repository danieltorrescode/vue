<template>
  <div>
    <br />
    <label for="name">Name</label>
    <input type="text" name="" id="name" v-model="form.name" />
    <br />
    <label for="description">Description</label>
    <input type="text" name="" id="description" v-model="form.description" />

    <br />
    <button @click="addTask">Submit</button>
    <br />
    <button @click="cancel('cancel')">Cancel</button>
  </div>
</template>

<script>
import formMixin from '@/mixins/form';
import rulesMixin from '@/mixins/rules';

export default {
  mixins: [formMixin, rulesMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
    },
  }),
  methods: {
    cancel: function (x) {
      alert(x);
    },
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
          // this.showMessage('Error', 'error');
        });

      // this.formReset();
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
          // this.showMessage('Error', 'error');
        });

      // this.formReset();
    },
  },
};
</script>
