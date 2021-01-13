<template>
  <q-page>
    <q-layout-container>
    <!-- 搜尋列 -->
    <div class="row" style="margin-bottom:1.5rem;margin-top:1.5rem">
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-10 col-md-8 col-lg-6" style="margin-top:20px">
        <q-input borderless dense debounce="300" v-model="filter" >
          <template v-slot:append id="search">
            <q-icon id="search-icon" name="search" />
          </template>
          <div id="search-select-out">
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
          </div>
          <q-btn unelevated rounded id="search-btn" label="搜尋" type="submit" />
        </q-input>
      </div>
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
    </div>
    <!-- 照片展示 -->
    <container class="flex flex-center">
      <div class="row fit wrap justify-center items-start">
        <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="photo in photos" :key="photo.file" :value="photo">
          <q-card class="my-card">
            <img :src="photo.src">
            <div class="absolute-bottom-right">
              <q-btn flat round color="white" icon="star" />
            </div>
          </q-card>
          <div class="flex justify-between" style="padding-top:5px">
            <q-chip>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </q-chip>
            <q-chip>{{ photo.animal }}</q-chip>
          </div>
        </div>
      </div>
    </container>
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
      animals: []
    }
  },
  mounted () {
    this.$axios.post('login', {
      username: 'username',
      password: 'password'
    })

    // 抓資料庫photos的所有圖
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.photos = res.data.result.map(photo => {
            photo.src = process.env.VUE_APP_API + '/photos/file/' + photo.file
            photo.des = photo.description
            photo.animals = photo.animal
            photo.breed = photo.breeds
            photo.bodypart = photo.bodyparts
            photo.start = false
            return photo
          })
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
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
