export default {
  props: {
    listResource: {
      type: String,
      required: true,
    },
    updateList: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      listLoading: false,
      listItems: [],
      listItem: null,
      listSearch: null,
      listDialog: false,
      listSelected: {},
    };
  },
  watch: {},
  methods: {
    selectItem(item, action) {
      this.listSelected = { ...item };
      if (action == 'det') {
        console.log(this.listSelected);
      } else if (action == 'upd') {
        this.$emit('listSelected', { ...item });
      } else {
        this.listDialog = true;
      }
    },
    showMessage(message, type) {
      this.$store.commit('setMessageColor', type);
      this.$store.commit('setMessageShow', true);
      this.$store.commit('setMessageText', message);
      this.$store.dispatch('cleanMessage');
    },
  },
};
