<template>
  <q-layout view="lhh lpR lFf" class="bg-grey-4">

    <q-header class="bg-grey-4 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" color="dark" />

        <q-toolbar-title class="text-dark">
          Petcle 後台管理系統
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
    show-if-above
    v-model="left"
    side="left"
    :width="300"
    :breakpoint="600"
    content-class="bg-grey-8"
    style="width:100%"
    >
      <q-btn class="flex flex-center justify-start" :to="{ name: 'admin.index' }">
        <img id="admin_img" src="../assets/petcle-logo-w.png" >
      </q-btn>
      <ul class="admin_menu flex justify-start">
        <li>
          <q-btn icon="forum" size="0.5rem" label="留言管理" :to="{ name: 'admin.discuss' }" style="font-size:1rem;letter-spacing:0.2rem;"></q-btn>
        </li>
        <li>
          <q-btn icon="fiber_new" size="0.5rem" label="最新消息" :to="{ name: 'admin.news' }" style="font-size:1rem;letter-spacing:0.2rem;"></q-btn>
        </li>
        <li>
          <q-btn icon="article" size="0.5rem" label="關於我們" :to="{ name: 'admin.about' }" style="font-size:1rem;letter-spacing:0.2rem;"></q-btn>
        </li>
        <li>
          <q-btn icon="supervisor_account" size="0.5rem" label="用戶管理" :to="{ name: 'admin.member' }" style="font-size:1rem;letter-spacing:0.2rem;"></q-btn>
        </li>
      </ul>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  }
}
</script>
