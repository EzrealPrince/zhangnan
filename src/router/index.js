import Vue from 'vue'
import Router from 'vue-router'
import CourseDetail from '../components/CourseDetail/CourseDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: () => import('../pages/Login')
    },
    {
      path: '/home',
      component: () => import('../pages/Home')
    }, {
      path: '/about',
      component: () => import('../pages/About')
    }, {
      path: '/article',
      component: () => import('../pages/Article')
    },  {
      path: '/login',
      component: () => import('../pages/Login')
    },
    {
      path: '/learn',
      component: () => import('../components/CourseMenu/CourseMenu'),
      children: [
        {
          path: '',
          component: CourseDetail
        },  {
          path: '/videoPlay',
          name: 'videoPlay',
          component: () => import('../components/CoursePlay/CoursePlay')
        }
      ]
    }
  ]
})
