<template>
  <q-page id="space">
    <div class="q-pa-md">
      <q-toolbar class="bg-white rounded-borders" style="color:#56C6BF">
        <q-btn flat label="療癒空間" />
        <q-space />
        <q-tabs v-model="tab" shrink stretch>
          <q-tab name="tab1" icon="play_circle" label="隨機播放" />
          <q-tab name="tab2" icon="photo" label="圖片展示" />
        </q-tabs>
      </q-toolbar>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- 隨機播放 -->
        <q-tab-panel name="tab1">
          <q-carousel v-model="slide" swipeable animated :autoplay="autoplay" infinite height="1200px" class=" text-white rounded-borders">
            <q-carousel-slide v-for="(item, index) in photo" :key="item.file" :value="item" :name="index" :img-src="item.src" />
            <template v-slot:control>
              <q-carousel-control position="bottom-right" :offset="[18, 18]">
                <q-btn
                  push
                  round
                  dense
                  color="white"
                  text-color="primary"
                  :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="fullscreen = !fullscreen"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </q-tab-panel>
        <!-- 圖片展示 -->
        <q-tab-panel name="tab2">
          <div class="flex">
            <div class="row fit wrap items-start">
              <div class="col-6 col-md-4 col-lg-4 col-xl-2 q-pa-sm" v-for="(item, index) in photo" :key="item.file" :value="item">
                <q-btn @click="photoOpen(item)">
                  <q-card class="my-pet-card">
                    <img :src="item.src" />
                    <div class="absolute-bottom-right">
                      <q-btn v-if="(item.star = true)" flat round color="red-9" icon="star" @click="del(index)" />
                    </div>
                  </q-card>
                </q-btn>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <!-- 點擊圖片彈出拍立得視窗 -->
      <q-dialog v-model="photoOpenn">
        <q-card class="column pet_card">
          <q-card-section class="row justify-end q-pb-none">
            <q-btn icon="close" round dense v-close-popup color="primary" />
          </q-card-section>
          <q-card-section class="photoBox">
            <img :src="photos.src" class="photo" />
          </q-card-section>
          <q-card-section>
            <div>
              <q-chip color="primary" text-color="white">
                {{ photos.animal }}
              </q-chip>
              <q-chip color="accent" text-color="white">
                {{ photos.breed }}
              </q-chip>
            </div>
          </q-card-section>
          <q-card-section style="margin:0 0 1rem 0.5rem">
            <div>
              {{ photos.description }}
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <!-- <template >
              <q-tabs v-model="tab" vertical class="spaceMenu-background">
                <q-tab name="play" icon="play_circle" label="隨機撥放" />
                <q-tab name="photo" icon="photo" label="最愛展示" />
              </q-tabs>
            </template> -->
    <!-- 隨機撥放 -->
    <!-- <q-tab-panel name="play">
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
              </q-tab-panel> -->
    <!-- 最愛展示 -->
    <!-- <q-tab-panel name="photo" style="padding:1rem">
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
              </q-tab-panel> -->
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      tab: 'tab1',
      slide: 1,
      autoplay: true,
      fullscreen: false,
      photoOpenn: false,
      photos: ''
    }
  },
  computed: {
    photo() {
      return this.$store.getters.stars
    }
  },
  methods: {
    del(index) {
      this.photo.star = false
      this.$store.commit('delPhoto', index)
    },
    photoOpen(item) {
      this.photoOpenn = true
      this.photos = item
    }
  }
}
</script>
