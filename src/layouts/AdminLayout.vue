<template>
  <q-layout view="lhh lpR lFf" class="bg-grey-4" id="adminLayout">
    <q-header class="bg-grey-4 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" color="dark" />

        <q-toolbar-title class="text-dark">
          Petcle 後台管理系統
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" :width="300" :breakpoint="600" content-class="bg-grey-8" class="menu">
      <q-btn class="flex flex-center justify-start" :to="{ name: 'front.index' }">
        <img id="admin_img" src="../assets/petcle-logo-w.png" />
      </q-btn>
      <ul class="admin_menu flex justify-start">
        <li style="display:block">
          <q-btn class="menu_btn" icon="forum" size="0.5rem" label="留言管理" :to="{ name: 'admin.discuss' }"></q-btn>
        </li>
        <li>
          <q-btn class="menu_btn" icon="fiber_new" size="0.5rem" label="最新消息" :to="{ name: 'admin.news' }"></q-btn>
        </li>
        <li>
          <q-btn class="menu_btn" icon="emoji_objects" size="0.5rem" label="寵物百科" :to="{ name: 'admin.pedia' }"></q-btn>
        </li>
        <li>
          <q-btn class="menu_btn" icon="mail" size="0.5rem" label="聯絡我們" :to="{ name: 'admin.contact' }"></q-btn>
        </li>
        <li>
          <q-btn class="menu_btn" icon="supervisor_account" size="0.5rem" label="用戶管理" :to="{ name: 'admin.member' }"></q-btn>
        </li>
        <li>
          <q-btn class="menu_btn" icon="pets" size="0.5rem" label="寵物管理" :to="{ name: 'admin.pet' }"></q-btn>
        </li>
        <li style="margin-top:120px;">
          <q-btn class="menu_btn" icon="login" size="0.5rem" label="登出" @click="logout"></q-btn>
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
  },
  methods: {
    logout () {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            alert('登出成功')
            this.$store.commit('logout')
            if (this.$router.path !== '/') {
              this.$router.push('/index')
            }
          } else {
            alert('錯誤')
          }
        })
        .catch(error => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    }
  }
}
</script>
