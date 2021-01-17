<template>
  <div class="q-pa-md flex justify-center" style="width:100%">
    <div class="q-gutter-y-md" style="width: 70%;margin-top:2rem">
      <q-tabs
          v-model="tab"
          inline-label
          switch-indicator
          indicator-color="secondary"
          active-color="secondary"
          class="bg-white"
          :breakpoint="0"
          align="justify"
          style="color:#56C6BF"
        >
          <q-tab name="new" label="新聞" class="tab_border"/>
          <q-tab name="even" label="活動" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="exhibition" label="展覽" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="adopt" label="領養" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="lost" label="走失" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="stray" label="浪浪" class="tab_border"/>
          <q-tab v-if="$q.screen.gt.sm" name="all" label="全部" class="tab_border" style="border-right:2px solid #56C6BF"/>
          <!-- 小尺寸時拉霸 -->
          <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat label="More...">
            <q-list>
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
          <q-tab-panel name="new" class="news_table">
            <div class="flex flex-center">
              <div class="flex row q-layout-container flex-center news_row" v-for="item in data" :key="item.title" :value="item">
                <div class="col-2 type_cube">
                  <div>{{ item.type }}</div>
                </div>
                <div class="col-7 table_title">
                  <q-item :to="{ name: 'front.space' }">{{ item.title }}</q-item>
                </div>
                <div class="col-2 table_date">
                  {{ item.date }}
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="even">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="exhibition">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="adopt">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="lost">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="stray">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="all">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </div>
    <q-dialog v-model="key" v-for="d in data" :key="d.title" :value="d">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'new',
      key: false,
      data: [
        {
          title: '知名老牌寵物飼料傳出使用過期原料',
          description: '內容1',
          type: '新聞快訊',
          date: '2021.01.16',
          photo: 2222
        },
        {
          title: '標題2',
          description: '內容2',
          type: '新聞快訊',
          date: '2021.01.16',
          photo: 2222
        },
        {
          title: '標題3',
          description: '內容3',
          type: '新聞快訊',
          date: '2021.01.16',
          photo: 2222
        },
        {
          title: '標題3',
          description: '內容3',
          type: '新聞快訊',
          date: 2021,
          photo: 2222
        },
        {
          title: '標題3',
          description: '內容3',
          type: '新聞快訊',
          date: 2021,
          photo: 2222
        },
        {
          title: '標題3',
          description: '內容3',
          type: '新聞快訊',
          date: 2021,
          photo: 2222
        }
      ]
    }
  }
}
</script>
