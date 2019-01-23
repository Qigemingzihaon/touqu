import Vue from 'vue';
import Router from 'vue-router';
import loading from '@/view/loading/index.vue'; //首页
import Home from '@/view/home/index.vue'; //首页
import poster from '@/view/poster/index.vue'; //首页
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
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '泸州老窖年货节',
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
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if(to.params.verify){
    if(to.params.verify==='1'){
      to.meta.keepAlive = false;
    }
  }
  next ();
});
export default router;
