import Vue from 'vue'
import Router from 'vue-router'
import LoadMore from '@/page/load-more-test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoadMore',
      component: LoadMore
    }
  ]
})
