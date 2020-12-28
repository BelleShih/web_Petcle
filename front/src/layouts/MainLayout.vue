<template>
  <q-layout>
    <q-header elevated class="bg-white h-100" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <img id="logo" src="../assets/petcle-logo.png">
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab class="tab" to="/questions" label="毛孩大小事" />
          <q-route-tab class="tab" to="/news" label="最新消息" />
          <q-route-tab class="tab" to="/about" label="關於 Petcle" />
          <q-route-tab class="tab" to="/login" label="登入" />
        </q-tabs>
      </q-toolbar>
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
