
// import MainLayout from 'layouts/MainLayout'
// import Index from 'pages/Index'
// import About from 'pages/About'
// import News from 'pages/News'
// import Pedia from 'pages/Pedia'
// import Questions from 'pages/Questions'

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
      }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
