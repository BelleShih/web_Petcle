<template>
  <q-page>
    <!-- <div class="flex">
      <div class="row fit wrap items-start">
        <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="(item, index) in photo" :key="item.file" :value="item">
          <q-card class="my-card">
            <img :src="item.src">
            <div class="absolute-bottom-right">
              <q-btn v-if="item.star = true" flat round color="red-9" icon="star" @click="del(index)"/>
            </div>
          </q-card>
        </div>
      </div>
    </div> -->
      <div class="q-pa-md">
        <q-layout view="hHh Lpr lff" container style="height:100vh">
          <q-header elevated class="bg-white">
            <q-toolbar>
              <q-btn flat @click="drawer = !drawer" round dense icon="menu" color="primary"/>
              <q-toolbar-title class="title">療癒空間</q-toolbar-title>
            </q-toolbar>
          </q-header>
          <!-- 左側選單 -->
          <q-drawer
            v-model="drawer"
            :width="150"
            :breakpoint="500"
            overlay
            content-class="spaceMenu-background"
          >
            <template >
              <q-tabs v-model="tab" vertical class="spaceMenu-background">
                <q-tab name="play" icon="play_circle" label="隨機撥放" />
                <q-tab name="photo" icon="photo" label="最愛展示" />
              </q-tabs>
            </template>
          </q-drawer>
          <template>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
            <!-- 隨機撥放 -->
              <q-tab-panel name="play">
                <q-carousel
                  v-model="slide"
                  swipeable
                  animated
                  :autoplay="autoplay"
                  infinite
                  height="1200px"
                  class=" text-white rounded-borders"
                >
                <q-carousel-slide v-for="(item, index) in photo" :key="item.file" :value="item" :name="index" :img-src="item.src"/>
                </q-carousel>
              </q-tab-panel>
              <!-- 最愛展示 -->
              <q-tab-panel name="photo" style="padding:1rem">
                <div class="flex">
                  <div class="row fit wrap items-start">
                    <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="(item, index) in photo" :key="item.file" :value="item">
                      <q-card class="my-card">
                        <img :src="item.src">
                        <div class="absolute-bottom-right">
                          <q-btn v-if="item.star = true" flat round color="red-9" icon="star" @click="del(index)"/>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-layout>
      </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      tab: 'play',
      slide: 'style',
      autoplay: true
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
