<template>
  <q-layout view="lhh lpR lFf" class="bg-grey-4">

    <q-header class="bg-grey-4 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
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
    class="flex column flex-center"
    style="width:100%"
    >
      <div class="flex flex-center">
        <img id="admin_img" src="../assets/petcle-logo-w.png">
      </div>
      <ul class="admin_menu flex flex-center">
        <li>
          <q-icon name="forum" size="1.2rem"></q-icon>
          <q-btn style="font-size: 1.2rem;letter-spacing:0.2rem;">討論區管理</q-btn>
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
