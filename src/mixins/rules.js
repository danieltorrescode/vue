/* eslint-disable */
export default {
  data() {
    return {
      rules: {
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) =>
            (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid',
        ],
        select: [(v) => !!v || 'Choose one (Required)'],
        mutiple: [(v) => v.length > 0 || 'Choose one (Required)'],
        required: value => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
