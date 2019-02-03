import Vue from 'vue'
import Router from 'vue-router'
import Study from './views/Study'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/study',
      name: 'Study',
      component: Study
    },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: Projects
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //   path: '/team',
    //   name: 'team',
    //   component: Team
    // },
    {
      path: '/examseat',
      name: 'examseat',
      component: () => import('./views/Studies_related/ExamSeating.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('./views/Studies_related/Booking.vue')
    },
    {
      path: '/stars',
      name: 'stars',
      component: () => import('./views/Studies_related/STARS.vue')
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('./views/Studies_related/Timetable.vue')
    },
    {
      path: '/modinfo',
      name: 'modinfo',
      component: () => import('./views/Studies_related/ModuleInformation.vue')
    },
    {
      path: '/examtime',
      name: 'examtime',
      component: () => import('./views/Studies_related/ExamTiming.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Food_related/Map.vue')
    },
    {
      path: '/hours',
      name: 'opening_hours',
      component: () => import('./views/Food_related/opening_hours.vue')
    },
    {
      path: '/makan',
      name: 'makan',
      component: () => import('./views/Food_related/Makan.vue')
    },
    {
      path: '/order',
      name: 'buy_food',
      component: () => import('./views/Food_related/buy_food.vue')
    }
  ]
})
