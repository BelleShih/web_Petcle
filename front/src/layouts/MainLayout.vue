<template>
  <q-layout>
    <q-header elevated class="bg-white h-100" height-hint="98">
      <div class="flex row wrap justify-between nav-padding">
        <div class="col-12 col-lg-4 row flex-left flex-logo-justify">
          <q-btn dense unelevated exact :to="{ name: 'front.index' }">
            <img id="logo" src="../assets/petcle-logo.png" >
          </q-btn>
        </div>
        <ul class="flex row col-12 col-md-12 col-xl-6">
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.questions' }">毛孩大小事</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.news' }" active-class="text-blue-3">最新消息</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.about' }" active-class="text-blue-3">關於 Petcle</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.news.list' }" active-class="text-blue-3">登入</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.news.list' }" active-class="text-blue-3">註冊</q-btn></li>
        </ul>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
