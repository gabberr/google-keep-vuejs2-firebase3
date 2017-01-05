// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Auth from './data/Auth'
import VueRouter from 'vue-router'
import NotesPage from './components/pages/Notes'
import AuthPage from './components/pages/Auth'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { name: 'notes', path: '/', component: NotesPage, alias: '/notes', auth: true },
    { name: 'auth', path: '/auth', component: AuthPage }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.auth && !Auth.getAuth()) {
    next({path: '/auth'})
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
