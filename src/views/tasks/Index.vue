<template>
  <div>
    <view-form
      :formResource="url"
      :formSelected="selectedItem"
      @updateList="updateList"
      @closeModal="showModal = !showModal"
    >
    </view-form>
    <br>
    <br>
    <br>
    <view-list
      :listResource="url"
      :updateList="updateItemList"
      @listSelected="listSelected"
    >
    </view-list>

  </div>
</template>

<script>
import Form from './Form.vue';
import List from './List.vue';


export default {
  components: {
    'view-form': Form,
    'view-list': List,
  },
  data: () => ({
    resource: 'tasks',
    selectedItem: {},
    showModal: false,
    updateItemList: '',
  }),
  computed: {
    url() {
      return `${this.$App.baseUrl}/${this.resource}/`;
    },
  },
  methods: {
    listSelected(item) {
      this.selectedItem = { ...item };
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
