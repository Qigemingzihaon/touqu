import Vue from 'vue';
import Router from 'vue-router';
import loading from '@/view/loading/index.vue'; //首页
import home from '@/view/home/index.vue'; //首页
import poster from '@/view/poster/index.vue'; //首页
import { getSSession, setSSession } from '@/utils/session.js'

Vue.use (Router);

const router = new Router ({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading,
      meta: {
        title: '泸州老窖年货节',
      },
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '泸州老窖年货节',
        login:true,
      },
    },
    {
      path: '/poster',
      name: 'poster',
      component: poster,
      meta: {
        title: '泸州老窖年货节',
      },
    },
  ],
});
router.beforeEach (function (to, from, next) {
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if(!getSSession('access_token')&&to.meta.login){
    next ({
      path: '/',
    });
  }else{
    next ();
  }
});
export default router;
