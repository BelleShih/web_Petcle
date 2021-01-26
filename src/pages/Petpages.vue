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
          <div class="col-3 master">@{{ master[0].name }}</div>
          <!-- 寄信給他 -->
          <q-btn icon="mail" color="primary" size="15px" rounded class="mail_btn" @click="sendMail(petpage)"> 寄信給牠</q-btn>
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
    <!-- 寄信的彈出視窗 -->
    <q-dialog v-model="mail">
        <q-card id="sendMail" class="flex row">
          <div class="col-12 flex flex-center column top">
            <div class="flex justify-end" style="width:100%">
              <q-btn icon="close" flat round dense v-close-popup color="primary"/>
            </div>
            <q-icon name="rate_review" color="primary" size="3rem">
            </q-icon>
            <p class="title">寄信給牠</p>
          </div>
          <div class="col-12 flex justify-center cloumn qes_div">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-form"
            >
              <!-- 主旨 -->
              <q-input class="input_title" filled v-model="title" label="請輸入主旨" />
              <!-- 照片說明 -->
              <q-input
                v-model="textarea"
                filled
                type="textarea"
                color="primary"
                label="內文"
                class="textarea"
              />
              <div class="flex flex-center btn">
                <q-btn rounded label="送出" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      petpage: [],
      mail: false,
      title: '',
      textarea: '',
      allUsers: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    master () {
      return this.allUsers.filter(item => {
        if (item._id === this.petpage.user) {
          return item
        }
      })
    }
  },
  methods: {
    // 維持文章送出格式
    html (description) {
      return description
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[\w-.]+(:\d+)?(\/[\w/.]*)?(\?\S*)?(#\S*)?)/g, '<a href="$1" target="_blank" >$1</a>')
    },
    sendMail (petpage) {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430',
          border: 'none'
        })
      } else {
        this.mail = true
      }
    },
    // 確認送信
    onSubmit (petpage) {
      if (this.title === '' || this.textarea === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '主旨或內文不可空白',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430',
          border: 'none'
        })
      } else {
        const sendMail = {
          title: this.title,
          description: this.textarea
        }
        this.axios.patch(process.env.VUE_APP_API + '/pets/mail/' + this.petpage._id, sendMail)
          .then(res => {
            if (res.data.success) {
              this.$swal.fire({
                icon: 'success',
                title: '成功送出',
                confirmButtonColor: '#C2B593',
                iconColor: '#56C6BF',
                border: 'none'
              })
              this.mail = false
            } else {
              this.$swal.fire({
                icon: 'error',
                title: '送出失敗',
                confirmButtonColor: '#C2B593',
                iconColor: '#8d2430',
                border: 'none'
              })
            }
          })
      }
    },
    onReset () {
      this.title = ''
      this.textarea = ''
    }
  },
  mounted () {
    // 抓使用者的寵物
    this.axios.get(process.env.VUE_APP_API + '/pets/' + this.$route.params.id)
      .then(res => {
        console.log(this.$route.params.id)
        if (res.data.success) {
          this.petpage = res.data.result
          this.petpage.src = process.env.VUE_APP_API + '/pets/file/' + this.petpage.file
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
    // 抓所有使用者
    this.axios.get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          this.allUsers = res.data.result.map(item => {
            return item
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
  }
}
</script>
