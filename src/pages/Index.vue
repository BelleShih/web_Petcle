<template>
  <q-page id="index">
    <q-page-container style="padding:50px 0 100px 0;">
      <!-- 搜尋列 -->
      <div class="row justify-center" style="margin-bottom:0.3rem;margin-top:1.5rem">
        <div class="col-xs-10 col-md-8 col-lg-6" style="margin-top:20px">
          <q-input borderless dense debounce="300" v-model="filtermodel" @keyup.enter="filterPhoto()">
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
            <q-btn rounded id="search-btn" type="submit" @click="filterPhoto()">搜尋</q-btn>
          </q-input>
        </div>
        <q-btn rounded class="col-xs-10 col-md-8 col-lg-1 random_btn" @click="random()" style="margin-top:1.2rem">
          <q-icon name="help_outline" size="1.2rem" style="margin-right:0.5rem"></q-icon>隨機療癒</q-btn>
      </div>
      <!-- 照片展示 -->
      <q-page-container class="flex flex-center page" style="">
        <div class="row fit wrap items-start">
          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 q-pa-sm" v-for="(photo, index) in filteredphoto" :key="photo._id" :value="photo">
            <q-card class="my-card">
              <img :src="photo.src" />
              <div class="absolute-bottom-right">
                <q-btn v-if="photo.star === false" flat round color="white" icon="star" @click="like(photo)" />
                <q-btn v-else flat round color="red-9" icon="star" @click="del(index)" />
              </div>
            </q-card>
            <div class="flex justify-end" style="padding-top:5px">
              <q-chip color="primary" text-color="white">{{ photo.animal }}</q-chip>
              <q-chip>{{ photo.breed }}</q-chip>
            </div>
          </div>
        </div>
      </q-page-container>
      <!-- 隨機療癒彈出視窗 -->
      <q-dialog v-model="randomCard">
        <q-card class="column pet_card">
          <q-card-section class="row justify-end q-pb-none">
            <q-btn icon="close" round dense v-close-popup color="primary" />
          </q-card-section>
          <q-card-section class="photoBox">
            <img :src="photos[rand].src" class="photo" />
          </q-card-section>
          <q-card-section>
            <div>
              <q-chip color="primary" text-color="white">
                {{ photos[rand].animal }}
              </q-chip>
              <q-chip color="accent" text-color="white">
                {{ photos[rand].breed }}
              </q-chip>
            </div>
          </q-card-section>
          <q-card-section style="margin:0 0 1rem 0.5rem">
            <div>
              {{ photos[rand].description }}
            </div>
            <div class="absolute-bottom-right" style="margin-right:1rem">
              <q-btn v-if="photos[rand].star === false" flat round color="negative" icon="star_border" @click="like_rand(photos[rand])" />
              <q-btn v-else flat round color="red-9" icon="star" @click="del(rand)" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
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
      filtermodel: '',
      randomCard: false,
      rand: 0,
      ranPhoto: []
    }
  },
  methods: {
    like (photo) {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '儲存失敗',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593'
        })
      } else {
        const idx = this.photos.findIndex(pho => pho._id === photo._id)
        console.log(idx)
        this.photos[idx].star = true
        this.$store.commit('like', photo)
      }
      this.$forceUpdate()
    },
    like_rand (item) {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '儲存失敗',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593'
        })
      } else {
        const idx = this.photos.findIndex(pho => pho._id === item._id)
        console.log(idx)
        // this.ranPhoto = item
        item.star = true
        this.$store.commit('like', item)
      }
      this.$forceUpdate()
    },
    del (index) {
      const idx = this.photos[index]
      this.photo[idx].star = false
      this.$store.commit('delPhoto', index)
      this.$forceUpdate()
    },
    filterPhoto (filter) {
      // 搜尋功能
      this.filter = this.filtermodel
    },
    random () {
      this.randomCard = true
      const r = (min, max) => {
        return Math.round(Math.random() * (max - min)) + min
      }
      this.rand = r(0, this.photos.length)
    },
    addAlbum (photo) {
      if (this.user.account === undefined) {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        this.axios.patch(process.env.VUE_APP_API + '/users/album/' + photo._id)
          .then(res => {
            if (res.data.success) {
              photo.star = true
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    redStar () {
      return this.$store.getters.stars
    },
    // filter文字過濾
    filteredphoto () {
      return this.photos.filter(photo => {
        const keyword = this.filter.toUpperCase()
        if (
          photo.animal
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        if (
          photo.breed
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        if (
          photo.bodypart
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        return false
      })
    }
    // rand() {
    //   const r = (min, max) => {
    //     return Math.round(Math.random() * (max - min)) + min
    //   }
    //   return r(0, this.photos.length)
    // }
  },
  async mounted () {
    this.$axios.post('login', {
      username: 'username',
      password: 'password'
    })

    // 抓資料庫photos的所有圖
    await this.axios
      .get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.photos = res.data.result.reverse()
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
          this.$swal.fire({
            icon: 'error',
            title: '錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 抓動物品種、類型、部位的name出來
    await this.photos.map(item => {
      this.axios
        .get(process.env.VUE_APP_API + '/photos/breeds/' + item._id)
        .then(res => {
          item.breed = res.data.breed.name
        })
        .catch(err => {
          console.log(err)
        })
      this.axios
        .get(process.env.VUE_APP_API + '/photos/bodyparts/' + item._id)
        .then(res => {
          item.bodypart = res.data.body.name
        })
        .catch(err => {
          console.log(err)
        })
      this.axios
        .get(process.env.VUE_APP_API + '/photos/animals/' + item._id)
        .then(res => {
          item.animal = res.data.animal
        })
        .catch(err => {
          console.log(err)
        })
    })
    // 加入購物車後星星的 bug
    this.redStar.forEach(item => {
      const p = this.photos.find(photo => {
        return item._id === photo._id
      })
      p.star = true
    })
    // // 加入購物車後星星的 bug
    // this.user.album.forEach(item => {
    //   const p = this.photos.find(photo => {
    //     return item.Photos === photo._id
    //   })
    //   p.star = true
    // })
    // 抓取動物資料
    this.axios
      .get(process.env.VUE_APP_API + '/animals/')
      .then(res => {
        if (res.data.success) {
          this.animals = res.data.result
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
