<template>
  <q-layout>
    <q-header elevated class="bg-white h-100" height-hint="98">
      <q-toolbar class="d-flex row wrap">
        <q-toolbar-title class="col-xs-12 col-lg-3 q-mr-auto">
          <img id="logo" src="../assets/petcle-logo.png">
        </q-toolbar-title>
        <q-tabs class="col-xs-12 col-lg-6">
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
