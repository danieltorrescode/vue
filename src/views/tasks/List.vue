<template>
  <div>
    <table>
      <tr >
        <th>Task</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="item in listItems">
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>
          <button @click="selectItem(item, 'upd')">edit</button>
        </td>
        <td>
          <button @click="selectItem(item, 'del')">delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import listMixin from '@/mixins/list';

export default {
  mixins: [listMixin],
  data: () => ({
    tableHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  created() {
    this.getTasks();
  },
  watch: {
    updateList: function () {
      this.getTasks();
    },
  },
  methods: {
    getTasks: async function () {
      this.listLoading = true;

      let content = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      };

      fetch(this.listResource, content)
        .then((response) => response.json())
        .then((json) => {
          this.listItems = json;
          this.listLoading = false;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    deleteTask: async function () {
      this.listDialog = false;
      let resource = `${this.listResource}/${this.listSelected._id}`;

      let content = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      };
      fetch(resource, content)
        .then((response) => response.json())
        .then((json) => {
          if (json.task._id) {
            console.log(json);
            // this.showMessage(json.text, 'success');
          }
          this.getTasks();
        })
        .catch((error) => {
          console.error('Error:', error);
          // this.showMessage('Error', 'error');
        });
      this.listSelected = {};
    },
  },
};
</script>
