<template>
  <q-page id="index">
    <q-layout-container>
    <!-- 搜尋列 -->
    <div class="row" style="margin-bottom:0.5rem;margin-top:1.5rem">
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-10 col-md-8 col-lg-6" style="margin-top:20px">
        <q-input borderless dense debounce="300" v-model="filtermodel" >
          <template v-slot:append id="search">
            <q-icon id="search-icon" name="search" />
          </template>
          <!-- <div id="search-select-out">
            <q-select
              id="search-select"
              v-model="model"
              :options="options"
              label=""
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div> -->
          <q-btn unelevated rounded id="search-btn" label="搜尋" type="submit" @click="filterPhoto()"/>
        </q-input>
      </div>
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
    </div>
    <!-- 照片展示 -->
    <q-page-container class="flex flex-center">
      <div class="row fit wrap items-start">
        <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="(photo, index) in filteredphoto" :key="photo.file" :value="photo">
          <q-card class="my-card">
            <img :src="photo.src">
            <div class="absolute-bottom-right">
              <q-btn v-if="photo.star === false" flat round color="white" icon="star" @click="like(photo)"/>
              <q-btn v-else flat round color="red-9" icon="star" @click="del(index)"/>
            </div>
          </q-card>
          <div class="flex justify-end" style="padding-top:5px">
            <q-chip>{{ photo.animal }}</q-chip>
            <q-chip>{{ photo.breed }}</q-chip>
          </div>
        </div>
      </div>
    </q-page-container>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      model: '依熱門程度排序',
      options: [
        {
          label: '依熱門程度排序',
          value: 'hot'
        },
        {
          label: '依時間新到舊',
          value: 'time-new-first'
        },
        {
          label: '依時間舊到新',
          value: 'time-old-first'
        }
      ],
      photos: [],
      animals: [],
      newPhotos: [],
      filter: '',
      filtermodel: ''
    }
  },
  methods: {
    like (photo) {
      photo.star = true
      this.$store.commit('like', photo)
    },
    del (index) {
      this.$store.commit('delPhoto', index)
    },
    filterPhoto (filter) {
      // 搜尋功能
      this.filter = this.filtermodel
    }
  },
  computed: {
    redStar () {
      return this.$store.getters.stars
    },
    filteredphoto () {
      return this.photos.filter(photo => {
        const keyword = this.filter.toUpperCase()
        if (photo.animal.toString().toUpperCase().includes(keyword)) {
          return true
        }
        if (photo.breed.toString().toUpperCase().includes(keyword)) {
          return true
        }
        if (photo.bodypart.toString().toUpperCase().includes(keyword)) {
          return true
        }
        return false
      })
    }
  },
  async mounted () {
    this.$axios.post('login', {
      username: 'username',
      password: 'password'
    })

    // 抓資料庫photos的所有圖
    await this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.photos = res.data.result.map(photo => {
            photo.src = process.env.VUE_APP_API + '/photos/file/' + photo.file
            photo.des = photo.description
            photo.breed = photo.breeds
            photo.bodypart = photo.bodyparts
            photo.star = false
            delete photo.breeds
            delete photo.bodyparts
            return photo
          })
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
      // 抓動物品種、類型、部位的name出來
    await this.photos.map(item => {
      this.axios.get(process.env.VUE_APP_API + '/photos/breeds/' + item._id).then(res => {
        item.breed = res.data.breed.name
      }).catch(err => {
        console.log(err)
      })
      this.axios.get(process.env.VUE_APP_API + '/photos/bodyparts/' + item._id).then(res => {
        console.log(res)
        item.bodypart = res.data.body.name
      }).catch(err => {
        console.log(err)
      })
      this.axios.get(process.env.VUE_APP_API + '/photos/animals/' + item._id).then(res => {
        item.animal = res.data.animal
      }).catch(err => {
        console.log(err)
      })
    })
    this.redStar.forEach(item => {
      const p = this.photos.find(photo => {
        return item._id === photo._id
      })
      p.star = true
    })
    // 抓取動物資料
    this.axios.get(process.env.VUE_APP_API + '/animals/')
      .then(res => {
        if (res.data.success) {
          this.animals = res.data.result
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
