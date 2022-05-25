import { createRouter, createWebHashHistory } from 'vue-router';
import Auth from './auth';
import Home from './home';
import Tasks from './task';


const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...Auth, ...Tasks, ...Home],
});

// Global Guard
router.beforeEach((to, from, next) => {
  let allowed = ['signup', 'login', 'error'];

  if (allowed.indexOf(to.name) == -1 && localStorage.getItem('token') == null) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
