<template>
  <v-container align-center>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12>
        <v-flex xs12 xs6>
          <v-text-field
            v-model="listSearch"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-flex>

        <v-data-table
          :headers="tableHeaders"
          :items="listItems"
          :search="listSearch"
          item-key="id"
          footer-props.items-per-page-text="Res. x Pag"
          sort-by=""
          :loading="listLoading"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-xs-left">{{ item.id }}</td>
              <td class="text-xs-left">{{ item.title }}</td>
              <td class="justify-center">
                <v-icon @click="selectItem(item, 'upd')"> edit </v-icon>
                <v-icon @click="selectItem(item, 'del')"> delete </v-icon>
              </td>
            </tr>
          </template>

          <!-- <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="selectItem(item, 'upd')">
              mdi-pencil
            </v-icon>
            <v-icon small @click="selectItem(item, 'del')"> mdi-delete </v-icon>
          </template> -->

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            "{{ listSearch }}" not founded.
          </v-alert>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="listDialog"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title color="error" primary-title>
          <h3>Alert</h3>
        </v-card-title>
        <v-card-text>
          <v-icon>alert</v-icon> want you delete: "{{ listSelected.title }}"
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="deleteTask()">confirm</v-btn>
          <v-btn color="error" @click="listDialog = !listDialog">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import listMixin from '~/mixins/list';

export default {
  mixins: [listMixin],
  data: () => ({
    tableHeaders: [
      { text: 'Name', value: 'id' },
      { text: 'Description', value: 'title' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  created() {
    this.getTasks();
  },
  methods: {
    getTasks: async function () {
      this.listLoading = true;
      fetch(this.listResource)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.listItems = json;
          this.listLoading = false;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    deleteTask: async function () {
      this.listDialog = false;
      let resource = `${this.listResource}/${this.listSelected.id}`;

      let content = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          /* Authorization: `${localStorage.getItem('token')}`, */
        },
      };

      fetch(resource, content)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          /* if (this.response.task._id) {
            this.showMessage(this.response.text, 'success');
          } */
        })
        .catch((error) => {
          console.error('Error:', error);
          this.showMessage('Error', 'error');
        });
      this.listSelected = {};
    },
  },
};
</script>
