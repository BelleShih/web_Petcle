<template>
  <q-page id="petpage" class="container flex-center h-100">
    <!-- 如果使用者寵物欄位有東西就顯示 -->
    <div class="row flex-center h-100 petpage_row">
      <!-- 寵物照片 -->
      <div class="flex-center column col-10 col-lg-6 box h-100 ">
        <img class="col-10" :src="petpage.src">
      </div>
      <!-- 右半資料 -->
      <div class="column col-10 col-lg-6 right justify-center">
        <!-- 寵物名字 -->
        <div class="row items-center">
          <div class="col-3 name">{{ petpage.name }}</div>
          <div class="col-3 master">@{{ user.name }}</div>
          <!-- 寄信給他 -->
          <q-btn icon="mail" color="primary" size="15px" rounded class="mail_btn"> 寄信給牠</q-btn>
        </div>
        <!-- 寵物自我介紹 -->
        <div>
          <p class="pet_des" v-html="html(petpage.description)"></p>
        </div>
        <!-- 線 -->
        <div class="line"></div>
        <!-- 寵物類型 -->
        <div class="row type">
          <div class="animal">{{ petpage.animal }}</div>
          <div class="breed">{{ petpage.breed }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      petpage: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    // 維持文章送出格式
    html (description) {
      return description
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[\w-.]+(:\d+)?(\/[\w/.]*)?(\?\S*)?(#\S*)?)/g, '<a href="$1" target="_blank" >$1</a>')
    }
  },
  mounted () {
    // 抓使用者的寵物
    this.axios.get(process.env.VUE_APP_API + '/pets/' + this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.petpage = res.data.result
          this.petpage.src = process.env.VUE_APP_API + '/pets/file/' + this.petpage.file
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
