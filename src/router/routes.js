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
          title: 'Petcle',
          login: false
        }
      },
      {
        path: 'questions',
        name: 'front.questions',
        component: () => import('pages/Questions.vue'),
        meta: {
          title: 'Petcle | 毛孩大小事',
          login: false
        }
      },
      {
        path: 'pedia',
        name: 'front.pedia',
        component: () => import('pages/Pedia.vue'),
        meta: {
          title: 'Petcle | 寵物百科',
          login: false
        }
      },
      {
        path: 'pedia/:id',
        name: 'front.pediaContent',
        component: () => import('pages/PediaContent.vue'),
        meta: {
          title: 'Petcle | 寵物百科',
          login: false
        }
      },
      {
        path: 'news',
        name: 'front.news',
        component: () => import('pages/News.vue'),
        meta: {
          title: 'Petcle | 最新消息',
          login: false
        }
      },
      {
        path: 'news/:id',
        name: 'front.newsContent',
        component: () => import('pages/NewsContent.vue'),
        meta: {
          title: 'Petcle | 最新消息',
          login: false
        }
      },
      {
        path: 'about',
        name: 'front.about',
        component: () => import('pages/About.vue'),
        meta: {
          title: 'Petcle | 關於Petcle',
          login: false
        }
      },
      {
        path: 'mypage',
        name: 'front.mypage',
        component: () => import('pages/Mypage.vue'),
        meta: {
          title: '我的主頁',
          login: true
        }
      },
      {
        path: 'petpage',
        name: 'front.petpage',
        component: () => import('pages/Petpage.vue'),
        meta: {
          title: '我的寶貝',
          login: true
        }
      },
      {
        path: 'petpage/:id',
        name: 'front.petpages',
        component: () => import('pages/Petpages.vue'),
        meta: {
          title: 'Petcle | 會員寵物',
          login: true
        }
      },
      {
        path: 'space',
        name: 'front.space',
        component: () => import('pages/Space.vue'),
        meta: {
          title: '療癒空間',
          login: true
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'admin.index',
        component: () => import('pages/AdminIndex.vue'),
        meta: {
          title: 'Petcle | 管理員系統',
          login: true
        }
      },
      {
        path: 'discuss',
        name: 'admin.discuss',
        component: () => import('pages/AdminDiscuss.vue'),
        meta: {
          title: 'Petcle | 討論區管理',
          login: true
        }
      },
      {
        path: 'news',
        name: 'admin.news',
        component: () => import('pages/AdminNews.vue'),
        meta: {
          title: 'Petcle | 最新消息管理',
          login: true
        }
      },
      {
        path: 'about',
        name: 'admin.about',
        component: () => import('pages/AdminAbout.vue'),
        meta: {
          title: 'Petcle | 關於我們管理',
          login: true
        }
      },
      {
        path: 'pedia',
        name: 'admin.pedia',
        component: () => import('pages/AdminPedia.vue'),
        meta: {
          title: 'Petcle | 寵物百科管理',
          login: true
        }
      },
      {
        path: 'mail',
        name: 'admin.mail',
        component: () => import('pages/AdminMail.vue'),
        meta: {
          title: 'Petcle | 信件管理',
          login: true
        }
      },
      {
        path: 'member',
        name: 'admin.members',
        component: () => import('pages/AdminMember.vue'),
        meta: {
          title: 'Petcle | 用戶管理',
          login: true
        }
      },
      {
        path: 'member/:id',
        name: 'admin.member',
        component: () => import('pages/AdminMemberContent.vue'),
        meta: {
          title: 'Petcle | 用戶管理',
          login: true
        }
      },
      {
        path: 'pet',
        name: 'admin.pet',
        component: () => import('pages/AdminPets.vue'),
        meta: {
          title: 'Petcle | 寵物管理',
          login: true
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
