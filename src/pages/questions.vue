<template>
  <q-page>
    <q-layout-container>
      <div class="flex row flex-center">
        <div class="flex row col-4">
          <q-btn flat style="color: #C2B593" label="飲食" />
          <q-btn flat style="color: #C2B593" label="生活" />
          <q-btn flat style="color: #C2B593" label="交友" />
          <q-btn flat style="color: #C2B593" label="生病" />
          <q-btn flat style="color: #C2B593" label="其他" />
        </div>
        <div>
          <q-input borderless dense debounce="300" v-model="filter" icon="search">
            <template v-slot:append id="search_q">
              <q-icon id="search-icon" name="search" />
            </template>
            <q-btn unelevated rounded id="search-btn" label="搜尋" type="submit" />
          </q-input>
        </div>
        <div>
          <q-btn id="pedia_enter" rounded icon="emoji_objects"  :to="{ name: 'front.pedia'}" label="寵物百科" />
        </div>
      </div>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
