import Home from '@/views/home/Home.vue';
import Error from '@/views/home/Error.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk
    // (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */
        '@/views/home/About.vue'
      ),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error,
  },
];
