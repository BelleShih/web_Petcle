<template>
  <q-page id="pediaContent">
    <div class="container flex-center">
      <div class="column flex-center" style="margin-top:3rem">
        <!-- 圖片 -->
        <div class="flex flex-center box">
          <img :src="pedias.src" class="object-fit">
        </div>
        <!-- 標題文字區 -->
        <div class="width">
          <p class="title">{{ pedias.title }}</p>
          <div class="row" style="padding-top:1rem">
            <div class="col-5 date">{{ new Date( pedias.date ).toDateString()}}</div>
            <div class="col-3 type">{{ pedias.type }}</div>
          </div>
            <!-- 線 -->
          <div class="col-8 line" style="margin-top:1rem"></div>
        </div>
        <!-- 內容 -->
        <div class="flex flex-center width">
          <p class="text" v-html="html(pedias.description)">
          </p>
        </div>
        <!-- 線 -->
        <div class="line" style="margin-bottom:2rem"></div>
        <q-btn icon="expand_less" color="primary" :to="{ name:'front.pedia'}">回到寵物百科</q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      pedias: {}
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/pedias/' + this.$route.params.id)
      .then(res => {
        console.log(this.$route.params.id)
        if (res.data.success) {
          this.pedias = res.data.result
          this.pedias.src = process.env.VUE_APP_API + '/pedias/file/' + this.pedias.file
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
        alert(err.response.data.message)
      })
  },
  methods: {
    html (description) {
      return description
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[\w-.]+(:\d+)?(\/[\w/.]*)?(\?\S*)?(#\S*)?)/g, '<a href="$1" target="_blank" >$1</a>')
    }
  }
}
</script>
