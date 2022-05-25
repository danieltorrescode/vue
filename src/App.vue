<template>
      <app-toolbar />
      <router-view />
    <!-- <app-message></app-message> -->
</template>

<script>
import AppToolBar from '@/layouts/AppToolBar.vue';
import AppMessage from '@/components/AppMessage.vue';

export default {
  name: 'App',

  components: {
    'app-toolbar': AppToolBar,
    // 'app-message': AppMessage,
  },

  data: () => ({
    //
  }),
};
</script>
