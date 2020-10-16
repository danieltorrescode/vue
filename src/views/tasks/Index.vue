<template>
  <v-container align-center>
    <v-btn
      slot="activator"
      dark
      class="mb-2"
      color="primary"
      right
      @click="showModal = !showModal"
    >
      Add Task
      <v-icon dark right>add</v-icon>
    </v-btn>

    <view-list
      :listResource="url"
      :updateList="updateItemList"
      @listSelected="listSelected"
    >
    </view-list>

    <app-modal :modal="showModal" @closeModal="showModal = !showModal">
      <view-form
        :formResource="url"
        :formSelected="selectedItem"
        @updateList="updateList"
        @closeModal="showModal = !showModal"
      >
      </view-form>
    </app-modal>
  </v-container>
</template>

<script>
import Form from './Form';
import List from './List';

import AppModal from '~/components/AppModal';

export default {
  components: {
    'view-form': Form,
    'view-list': List,
    'app-modal': AppModal,
  },
  data: () => ({
    resource: 'tasks',
    selectedItem: {},
    showModal: false,
    updateItemList: '',
  }),
  computed: {
    url() {
      return `${this.$App.baseUrl}/${this.resource}`;
    },
  },
  methods: {
    listSelected(item) {
      this.selectedItem = { ...item };
      this.showModal = !this.showModal;
    },
    updateList(item) {
      this.selectedItem = {};
      if ('_id' in item) {
        let seconds = new Date();
        this.updateItemList = item._id + seconds.getSeconds();
      }
    },
  },
};
</script>
