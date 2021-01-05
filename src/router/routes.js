// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'index',
        name: 'front.index',
        component: () => import('pages/Index.vue'),
        meta: {
          title: 'Petcle'
        }
      },
      {
        path: 'questions',
        name: 'front.questions',
        component: () => import('pages/Questions.vue'),
        meta: {
          title: '毛孩大小事'
        }
      },
      {
        path: 'pedia',
        name: 'front.pedia',
        component: () => import('pages/Pedia.vue'),
        meta: {
          title: '寵物百科'
        }
      },
      {
        path: 'news',
        name: 'front.news',
        component: () => import('pages/News.vue'),
        meta: {
          title: '最新消息'
        }
      },
      {
        path: 'about',
        name: 'front.about',
        component: () => import('pages/About.vue'),
        meta: {
          title: '關於Petcle'
        }
      },
      {
        path: '/mypage',
        name: 'front.mypage',
        component: () => import('pages/Mypage.vue'),
        meta: {
          title: '我的主頁'
        }
      },
      {
        path: '/petpage',
        name: 'front.petpage',
        component: () => import('pages/Petpage.vue'),
        meta: {
          title: '我的寶貝'
        }
      },
      {
        path: '/space',
        name: 'front.space',
        component: () => import('pages/Space.vue'),
        meta: {
          title: '療癒空間'
        }
      }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
