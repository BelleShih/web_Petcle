<template>
  <q-page id="question">
    <q-layout-container>
      <div class="flex row flex-center">
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
        <!-- 寵物百科 -->
        <div class="flex row col-xs-5 col-lg-2 flex-center">
          <q-btn id="pedia_enter" rounded icon="emoji_objects"  :to="{ name: 'front.pedia'}" label="寵物百科" />
        </div>
      </div>
        <!-- 全部內容頁 -->
        <q-tab-panels v-model="tab" animated class="flex flex-center tab-panels">
          <q-tab-panel name="all" class="ques_tab">
            <div class="q-layout">
              <div class="flex row">
                <div class="flex col-xs-10 col-sm-5 col-lg-4 qus_card">
                  <div class="col-12 qus_card_top">
                    <p class="title">標題標題標題標題</p>
                    <p class="des">內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文</p>
                  </div>
                  <div class="flex row col-12">
                    <q-avatar size="sm">
                      <img src="../assets/04.jpg">
                    </q-avatar>
                    <p class="name">發問者</p>
                  </div>
                </div>
              </div>
            </div>
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
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: 'all'
    }
  }
}
</script>
