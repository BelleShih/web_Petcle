<template>
  <div class="q-pa-md flex justify-center" style="width:100%">
    <div class="q-gutter-y-md" style="width: 70%;margin-top:2rem">
      <q-tabs
          v-model="tab"
          inline-label
          indicator-color="secondary"
          active-color="secondary"
          class="bg-white"
          :breakpoint="0"
          align="justify"
          style="color:#56C6BF"
        >
          <q-tab name="all" label="全部" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="new" label="新聞" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="even" label="活動" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="exhibition" label="展覽" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="adopt" label="領養" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="lost" label="走失" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="stray" label="浪浪" class="tab_border"/>
          <!-- 小尺寸時拉霸 -->
          <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch label="更多分類">
            <q-list>
              <q-item clickable @click="tab = 'new'">
                <q-item-section>新聞</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'even'">
                <q-item-section>活動</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'exhibition'">
                <q-item-section>展覽</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'adopt'">
                <q-item-section>領養</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'lost'">
                <q-item-section>走失</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'stray'">
                <q-item-section>浪浪</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'all'">
                <q-item-section>全部</q-item-section>
              </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
      <!-- 新聞快訊內容頁 -->
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="all" class="news_table">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in news" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 新聞快訊分頁 -->
          <q-tab-panel name="new">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in newNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 活動消息分頁 -->
          <q-tab-panel name="even">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in evenNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 展覽資訊分頁 -->
          <q-tab-panel name="exhibition">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in exhibitionNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 愛心領養分頁 -->
          <q-tab-panel name="adopt">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in adoptNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 走失情報分頁 -->
          <q-tab-panel name="lost">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in lostNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- 流浪動物分頁 -->
          <q-tab-panel name="stray">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in strayNews" :key="item._id" :value="item">
                <div class="col-2 type_cube" :style="getCubeBG(item.type)">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to=" '/news/' + item._id ">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ new Date( item.date ).toLocaleString()}}
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'new',
      key: false,
      news: [],
      newNews: [],
      evenNews: [],
      exhibitionNews: [],
      adoptNews: [],
      lostNews: [],
      strayNews: []
    }
  },
  methods: {
    // 不同分類給他的cube不同背景色
    getCubeBG (type) {
      let background = ''
      switch (type) {
        case '新聞快訊':
          background = '#C2B593'
          break
        case '活動消息':
          background = '#56C6BF'
          break
        case '展覽資訊':
          background = '#548E9B'
          break
        case '愛心領養':
          background = '#A9486B'
          break
        case '走失情報':
          background = '#E8D38B'
          break
        case '流浪動物':
          background = '#B4B4B4'
          break
      }
      return { background }
    }
  },
  async mounted () {
    // 抓全部的消息
    await this.axios.get(process.env.VUE_APP_API + '/news/')
      .then(res => {
        if (res.data.success) {
          this.news = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/news/file/' + item.file
            return item
          })
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 過濾活動消息
    this.newNews = this.news.filter(item => {
      return item.type === '新聞快訊'
    })
    // 過濾活動消息
    this.evenNews = this.news.filter(item => {
      return item.type === '活動消息'
    })
    // 過濾展覽資訊
    this.exhibitionNews = this.news.filter(item => {
      return item.type === '展覽資訊'
    })
    // 過濾愛心領養
    this.adoptNews = this.news.filter(item => {
      return item.type === '愛心領養'
    })
    // 過濾走失情報
    this.lostNews = this.news.filter(item => {
      return item.type === '走失情報'
    })
    // 過濾流浪動物
    this.strayNews = this.news.filter(item => {
      return item.type === '流浪動物'
    })
  }
}
</script>
