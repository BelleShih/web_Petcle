<template>
  <q-page id="newsContent">
    <q-layout-container>
      <div class="flex flex-center column" style="margin-top:3rem">
        <!-- 線 -->
        <div class="line"></div>
        <!-- 標題文字區 -->
        <div class="width">
          <div class="type">
            <p >{{ news.type }}</p>
          </div>
          <p class="title">{{ news.title }}</p>
          <p>{{ new Date( news.date ).toDateString()}}</p>
        </div>
        <!-- 線 -->
        <div class="line" style="margin-top:1rem"></div>
        <!-- 圖片 -->
        <div class="box">
          <img :src="news.src" class="object-fit">
        </div>
        <!-- 內容 -->
        <div class="flex flex-center width">
          <p class="text" v-html="html(news.description)">
          </p>
        </div>
        <!-- 線 -->
        <div class="line" style="margin-bottom:2rem"></div>
        <q-btn icon="expand_less" color="primary" :to="{ name:'front.news'}">回到最新消息</q-btn>
      </div>
    </q-layout-container>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      news: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/news/' + this.$route.params.id)
      .then(res => {
        console.log(this.$route.params.id)
        if (res.data.success) {
          this.news = res.data.result
          this.news.src = process.env.VUE_APP_API + '/news/file/' + this.news.file
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
