<template>
  <q-layout>
    <q-header elevated class="bg-white h-100" height-hint="98">
      <div class="d-flex row wrap">
        <div class="col-12 col-lg-6 row flex-center">
          <img id="logo" src="../assets/petcle-logo.png">
        </div>
        <q-tabs class="col-12 col-lg-6 ">
          <q-route-tab class="tab" to="/questions" label="毛孩大小事" />
          <q-route-tab class="tab" to="/news" label="最新消息" />
          <q-route-tab class="tab" to="/about" label="關於 Petcle" />
          <q-route-tab class="tab" to="/login" label="登入" />
        </q-tabs>
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
