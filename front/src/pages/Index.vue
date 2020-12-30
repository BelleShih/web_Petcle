<template>
  <q-page>
    <div class="row">
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-10 col-md-8 col-lg-6" style="margin-top:20px">
        <q-input borderless dense debounce="300" v-model="filter" >
          <template v-slot:append id="search">
            <q-icon id="search-icon" name="search" />
          </template>
            <q-select
              id="search-select"
              v-model="model"
              :options="options"
              label="搜尋條件"
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
          <q-btn unelevated rounded id="search-btn" label="搜尋" />
        </q-input>
      </div>
      <div class="col-xs-1 col-md-2 col-lg-3"></div>
    </div>
    <q-layout-container class="flex flex-center">
      <div class="row fit wrap justify-center items-start">
        <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="n in 10" :key="`xs-${n}`">
          <q-card class="my-card">
            <img src="~assets/02.jpg">
            <div class="absolute-bottom-right">
              <q-btn flat round color="white" icon="star" />
            </div>
          </q-card>
            <q-btn flat round color="red" icon="favorite" />
        </div>
      </div>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      model: null,
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
      ]
    }
  }
}
</script>
