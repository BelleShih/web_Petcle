<template>
  <q-page id="pedia" style="height:100%">
    <q-page-container style="height:100%">
      <div class="flex flex-center" style="height:100%;">
        <!-- 搜尋功能 -->
        <!-- <q-input borderless dense debounce="300" v-model="filtermodel" @keyup.enter="filterMail()" class="mailSearch">
          <template v-slot:append>
            <q-icon id="search-icon" name="search" />
          </template>
          <q-btn unelevated rounded label="搜尋" type="submit" @click="filterMail()" color="secondary" style="width:60px"/>
        </q-input> -->
        <!-- 寵物文章 -->
        <div class="row flex-center">
          <div class="col-10 col-md-5 col-lg-5 q-pa-sm flex" v-for="pedia in pedias" :key="pedia._id" :value="pedia" id="pedia">
            <q-card class="pedia-card flex column">
              <div class="flex col-6">
                <img :src="pedia.src" />
              </div>
              <div class="flex col-4" style="padding:1rem">
                <p class="text-h6 q-mt-sm q-mb-xs title">{{ pedia.title }}</p>
                <p class="text-caption text-black pedia_des">
                  {{ pedia.description }}
                </p>
              </div>
              <div class="flex col-2 justify-end">
                <q-btn flat color="dark" label="繼續閱讀" :to="'/pedia/' + pedia._id" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      pedias: []
    }
  },
  // 抓全部文章
  mounted () {
    this.axios
      .get(process.env.VUE_APP_API + '/pedias/')
      .then(res => {
        if (res.data.success) {
          this.pedias = res.data.result.reverse()
          this.pedias = res.data.result.map(pedia => {
            pedia.src = process.env.VUE_APP_API + '/pedias/file/' + pedia.file
            return pedia
          })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430',
            border: 'none'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
