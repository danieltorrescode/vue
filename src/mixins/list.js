export default {
  props: {
    listResource: {
      type: String,
      required: true,
    },
    updateList: {
      type: Number,
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
  },
};
