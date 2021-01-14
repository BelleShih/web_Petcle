<template>
  <q-page>
    <q-layout-container>
      <container class="flex flex-center">
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
    </container>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  data () {
    return {}
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
