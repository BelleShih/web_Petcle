<template>
  <q-layout>
    <q-header elevated class="bg-white h-100" height-hint="98">
      <div class="flex row wrap">
        <div class="col-12 col-lg-5 row flex-left flex-sm-center">
          <img id="logo" src="../assets/petcle-logo.png">
        </div>
        <q-tabs class="col-12 col-lg-7 ">
          <q-route-tab class="tab" to="/questions" label="毛孩大小事" />
          <q-route-tab class="tab" to="/news" label="最新消息" />
          <q-route-tab class="tab" to="/about" label="關於 Petcle" />
          <q-route-tab class="tab" to="/login" label="登入" />
          <q-route-tab class="tab" to="/registered" label="註冊" />
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
