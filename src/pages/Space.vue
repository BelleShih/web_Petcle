<template>
  <q-page>
    <q-layout-container>
      <div class="q-pa-md">
        <q-layout view="lhh Lpr lff" container style="height:200px" class="rounded-borders">
          <q-header elevated class="bg-white">
            <q-toolbar>
              <q-btn flat @click="drawer = !drawer" round dense icon="menu" color="primary"/>
              <q-toolbar-title class="title">療癒空間</q-toolbar-title>
            </q-toolbar>
          </q-header>

          <q-drawer
            v-model="drawer"
            show-if-above
            :width="200"
            :breakpoint="500"
            bordered
            content-class="bg-grey-3"
          >
            <template v-for="(menuItem, index) in menuList">
              <q-item :key="index" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>
          </q-drawer>

          <q-page-container>
            <q-page padding>
              <p v-for="n in 15" :key="n">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
              </p>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
      <!-- <container class="flex flex-center">
      <div class="row fit wrap items-start">
        <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="item in photo" :key="item.file" :value="item">
          <q-card class="my-card">
            <img :src="item.src">
            <div class="absolute-bottom-right">
              <q-btn v-if="photo.star = true" flat round color="red-9" icon="star" @click="del(index)"/>

            </div>
          </q-card>
        </div>
      </div>
    </container> -->
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    photo () {
      return this.$store.getters.stars
    }
  },
  methods: {
    del (index) {
      this.photo.star = false
      this.$store.commit('delPhoto', index)
    }
  }
}
</script>
