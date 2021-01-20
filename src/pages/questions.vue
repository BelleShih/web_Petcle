<template>
  <q-page id="question">
    <q-layout-container class="container">
      <div class="flex row row-1 flex-center">
        <!-- 問題分類 menu -->
        <q-tabs
          v-model="tab"
          inline-label
          indicator-color="primary"
          active-color="primary"
          class="bg-white flex row col-xs-5 col-lg-5"
          :breakpoint="0"
          align="justify"
          style="color:#C2B593"
        >
          <q-tab name="all" label="全部" class="tab"/>
          <q-tab v-if="$q.screen.gt.sm" name="eat" label="飲食" class="tab"/>
          <q-tab v-if="$q.screen.gt.sm" name="life" label="生活" class="tab"/>
          <q-tab v-if="$q.screen.gt.sm" name="friend" label="交友" class="tab"/>
          <q-tab v-if="$q.screen.gt.sm" name="sick" label="生病" class="tab"/>
          <q-tab v-if="$q.screen.gt.sm" name="other" label="其他" class="tab"/>
          <!-- 小尺寸時拉霸 -->
          <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch label="更多分類">
            <q-list>
              <q-item clickable @click="tab = 'eat'">
                <q-item-section>飲食</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'life'">
                <q-item-section>生活</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'friend'">
                <q-item-section>交友</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'sick'">
                <q-item-section>生病</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'other'">
                <q-item-section>其他</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
        <!-- 搜尋功能 -->
        <div class="flex row col-xs-5 col-lg-3 flex-center search">
          <q-input borderless dense debounce="300" v-model="filtermodel" >
            <template v-slot:append id="search">
              <q-icon id="search-icon" name="search" />
            </template>
            <q-btn unelevated rounded label="搜尋" type="submit" @click="filterPhoto()" class="btn"/>
          </q-input>
        </div>
        <!-- 寵物百科按鈕 -->
        <div class="flex row col-xs-5 col-lg-2 flex-center pl">
          <q-btn id="pedia_enter" rounded icon="emoji_objects"  :to="{ name: 'front.pedia'}" label="寵物百科" />
        </div>
      </div>
    </q-layout-container>

    <!-- 全部問題頁 -->
    <q-tab-panels v-model="tab" animated class="tab-panels flex m-auto w-85">
      <q-tab-panel name="all" class="flex row justify-betwen" >
        <q-btn align="left" class="flex col-xs-12 col-sm-6 col-lg-4 qus_btn" v-for="item in discuss" :key="item._id" :value="item" @click="qes = true">
          <div class="border">
            <div class="col-12 qus_card_top">
            <p class="title">{{ item.title }}</p>
            <p class="des">{{ item.description }}</p>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg">
              </q-avatar>
              <p class="name">{{ item.user }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="eat" class="news_table">
      </q-tab-panel>
      <q-tab-panel name="life" class="news_table">
      </q-tab-panel>
      <q-tab-panel name="friend" class="news_table">
      </q-tab-panel>
      <q-tab-panel name="sick" class="news_table">
      </q-tab-panel>
      <q-tab-panel name="other" class="news_table">
      </q-tab-panel>
    </q-tab-panels>
    <!-- 網友問題視窗 -->
    <q-dialog v-model="qes" v-for="item in discuss" :key="item._id" :value="item">
      <q-card id="qes_dialog" style="width:50%">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 flex row">
            <p class="mr-auto">{{ item.title }}</p>
            <p>user</p>
          </div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 我要發問按鈕 -->
    <div class="q-pa-md q-gutter-lg que-btn">
      <q-btn round size="35px" color="primary"/>
      <p>我要發問</p>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: 'all',
      discuss: [],
      qes: false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/discuss/')
      .then(res => {
        if (res.data.success) {
          this.discuss = res.data.result.map(item => {
            return item
          })
        }
      })
  }
}
</script>
