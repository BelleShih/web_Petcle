<template>
  <q-page id="newsContent">
    <q-layout-container>
      <div class="flex flex-center column" style="margin-top:3rem">
        <!-- 線 -->
        <div class="line"></div>
        <!-- 標題文字區 -->
        <div class="width">
          <div class="type">
            <p >{{ pedias.type }}</p>
          </div>
          <p class="title">{{ pedias.title }}</p>
          <p>{{ new Date( pedias.date ).toDateString()}}</p>
        </div>
        <!-- 線 -->
        <div class="line" style="margin-top:1rem"></div>
        <!-- 圖片 -->
        <div class="box">
          <img :src="pedias.src" class="object-fit">
        </div>
        <!-- 內容 -->
        <div class="flex flex-center width">
          <p class="text" v-html="html(pedias.description)">
          </p>
        </div>
        <!-- 線 -->
        <div class="line" style="margin-bottom:2rem"></div>
        <q-btn icon="expand_less" color="primary" :to="{ name:'front.pedias'}">回到寵物百科</q-btn>
      </div>
    </q-layout-container>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      pedias: []
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
          alert(res.data.message)
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
