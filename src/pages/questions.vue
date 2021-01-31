<template>
  <q-page id="question">
    <q-layout-container class="container">
      <div class="flex row row-1 flex-center">
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
          <q-tab name="all" label="全部" class="tab" />
          <q-tab v-if="$q.screen.gt.sm" name="eat" label="飲食" class="tab" />
          <q-tab v-if="$q.screen.gt.sm" name="life" label="生活" class="tab" />
          <q-tab v-if="$q.screen.gt.sm" name="friend" label="交友" class="tab" />
          <q-tab v-if="$q.screen.gt.sm" name="sick" label="生病" class="tab" />
          <q-tab v-if="$q.screen.gt.sm" name="other" label="其他" class="tab" />
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
          <q-input borderless dense debounce="300" v-model="filtermodel" @keyup.enter="filterDiscuss()">
            <template v-slot:append id="search">
              <q-icon id="search-icon" name="search" />
            </template>
            <q-btn unelevated rounded label="搜尋" type="submit" @click="filterDiscuss()" class="btn" />
          </q-input>
        </div>
        <!-- 寵物百科按鈕 -->
        <div class="flex row col-xs-5 col-lg-2 flex-center pl">
          <q-btn id="pedia_enter" rounded icon="emoji_objects" :to="{ name: 'front.pedia' }" label="寵物百科" />
        </div>
      </div>
    </q-layout-container>

    <!-- 全部問題頁 -->
    <q-tab-panels v-model="tab" animated class="tab-panels flex m-auto w-85">
      <q-tab-panel name="all" class="flex row justify-betwen">
        <q-btn
          align="left"
          class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn"
          v-for="item in filteredDiscuss"
          :key="item._id"
          :value="item"
          @click="discussOpen(item)"
        >
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="eat" class="flex row justify-betwen news_table">
        <q-btn align="left" class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn" v-for="item in eatDis" :key="item._id" :value="item" @click="discussOpen(item)">
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="life" class="flex row justify-betwen news_table">
        <q-btn align="left" class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn" v-for="item in lifeDis" :key="item._id" :value="item" @click="discussOpen(item)">
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="friend" class="flex row justify-betwen news_table">
        <q-btn
          align="left"
          class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn"
          v-for="item in friendDis"
          :key="item._id"
          :value="item"
          @click="discussOpen(item)"
        >
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="sick" class="flex row justify-betwen news_table">
        <q-btn align="left" class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn" v-for="item in sickDis" :key="item._id" :value="item" @click="discussOpen(item)">
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
      <q-tab-panel name="other" class="flex row justify-betwen news_table">
        <q-btn align="left" class="flex col-xs-12 col-sm-12 col-lg-4 qus_btn" v-for="item in otherDis" :key="item._id" :value="item" @click="discussOpen(item)">
          <div class="border">
            <div class="row col-12 justify-between qus_card_top">
              <!-- 分類標籤 -->
              <q-chip color="primary" text-color="white" class="chip">
                {{ item.questiontype }}
              </q-chip>
              <!-- 標題 -->
              <p class="col-12 title">{{ item.title }}</p>
              <!-- 內文 -->
              <p class="des">{{ item.description }}</p>
              <div class="dis_date">{{ new Date(item.date).toLocaleString() }}</div>
            </div>
            <div class="flex row col-12 qus_card_bottom">
              <q-avatar size="sm">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <p class="name" style="margin-right:auto">{{ item.user }}</p>
              <p class="fb_length">{{ item.feedback.length }}</p>
              <!-- <p class="self-end">5</p> -->
            </div>
          </div>
        </q-btn>
      </q-tab-panel>
    </q-tab-panels>
    <!-- 網友問題視窗 -->
    <q-dialog v-model="qes">
      <q-card id="qes_dialog" class="w-RWD">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" round dense v-close-popup color="primary" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 row justify-between">
            <p class="dis_title">{{ discussmodel.title }}</p>
            <div class="row items-center">
              <q-avatar size="1.9rem">
                <img src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <q-btn size="1.2rem" class="asker" @click="askName()">{{ discussmodel.user }}</q-btn>
            </div>
          </div>
          <div class="row">
            <q-chip color="primary" text-color="white" class="chip">
              {{ discussmodel.questiontype }}
            </q-chip>
            <div class="qes_date">{{ new Date(discussmodel.date).toLocaleString() }}</div>
          </div>
        </q-card-section>
        <q-card-section class="dis_des">
          {{ discussmodel.description }}
        </q-card-section>
        <!-- 線 -->
        <q-card-section style="border-bottom:1px solid #B4B4B4"></q-card-section>
        <!-- 網友回覆區 -->
        <q-card-section>
          <div class="fb" style="" v-for="fb in discussmodel.feedback" :key="fb._id" :value="fb">
            <div class="flex row align-center h-auto">
              <q-avatar size="30px">
                <img class="col-1" src="../assets/userphoto-01.jpg" />
              </q-avatar>
              <q-btn class="col-1 fb-1" @click="getPetFb(fb)">{{ fb.user }}</q-btn>
              <div class="col-7 fb-2">{{ fb.description }}</div>
              <div class="col-12 col-lg-2 fb-3">{{ new Date(fb.date).toLocaleString() }}</div>
            </div>
          </div>
        </q-card-section>
        <!-- 使用者回覆區 -->
        <q-card-section style="border-top:2px solid #C2B593; background:#C2B593">
          <div class="row flex-center" style="width:100%;">
            <!-- 使用者大頭照 -->
            <div class="col-auto" style="padding-right:1rem">
              <q-avatar size="30px">
                <img class="col-1" src="../assets/userphoto-01.jpg" />
              </q-avatar>
            </div>
            <!-- 使用者回覆輸入區 -->
            <div class="col">
              <form class="align-center" style="width:100%;display:flex;">
                <textarea clearable v-model="modelFeedback" class="fb_btn" />
                <q-btn outline color="white" label="送出" @click="addfb()" />
              </form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 我要發問按鈕 -->
    <div class="q-pa-md q-gutter-lg que-btn">
      <q-btn round size="35px" color="primary" @click="quedialog = true" />
      <p>我要發問</p>
    </div>
    <!-- 發問視窗 -->
    <q-dialog v-model="quedialog">
      <q-card id="quedialog" class="flex row">
        <div class="col-12 flex flex-center column top">
          <div class="flex justify-end" style="width:100%">
            <q-btn icon="close" flat round dense v-close-popup color="white" />
          </div>
          <p class="title">我要發問</p>
        </div>
        <div class="col-12 flex justify-center cloumn qes_div">
          <q-form @submit="onSubmit" @reset="onReset" class="q-form">
            <!-- 主旨 -->
            <q-input class="input_title" filled v-model="title" label="請輸入主旨" />
            <!-- 分類 -->
            <select class="col-12 select" v-model="type" placeholder="請選擇分類">
              <option value="" disabled selected>請選擇分類</option>
              <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
            </select>
            <!-- 照片說明 -->
            <q-input v-model="textarea" filled type="textarea" color="primary" label="說明文字" class="textarea" />
            <div class="flex flex-center btn">
              <q-btn rounded label="送出" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px" />
              <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px" />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: 'all',
      discuss: [],
      qes: false,
      modelFeedback: '',
      filter: '',
      filtermodel: '',
      discussmodel: {},
      quedialog: false,
      types: ['飲食', '生活', '交友', '生病', '其他'],
      title: '',
      type: '',
      textarea: '',
      allPets: [],
      fbUser: [],
      eatDis: [],
      lifeDis: [],
      friendDis: [],
      sickDis: [],
      otherDis: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    getPet() {
      return this.allPets.filter(item => {
        if (this.discussmodel.uid === item.user) {
          return item
        }
      })
    },
    getPetFB() {
      return this.allPets.filter(item => {
        if (this.fbUser.uid === item.user) {
          return item
        }
      })
    },
    // 搜尋功能
    filteredDiscuss() {
      return this.discuss.filter(dis => {
        const keyword = this.filter.toUpperCase()
        if (
          dis.title
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        if (
          dis.description
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        if (
          dis.questiontype
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        if (
          dis.user
            .toString()
            .toUpperCase()
            .includes(keyword)
        ) {
          return true
        }
        return false
      })
    }
  },
  methods: {
    discussOpen(item) {
      this.qes = true
      this.discussmodel = item
    },
    // 使用者送出留言
    addfb() {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '上傳錯誤',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        const reply = { description: this.modelFeedback }
        this.axios.patch(process.env.VUE_APP_API + '/discuss/fb/' + this.discussmodel._id, reply).then(res => {
          if (res.data.success) {
            this.discussmodel.feedback.push({ description: this.modelFeedback, user: this.user.name, date: Date.now() })
            this.modelFeedback = ''
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '回覆失敗',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430'
            })
          }
        })
      }
    },
    onSubmit() {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '發送失敗',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        const reply = {
          title: this.title,
          description: this.textarea,
          questiontype: this.type
        }
        this.axios.post(process.env.VUE_APP_API + '/discuss/', reply).then(res => {
          if (res.data.success) {
            this.discuss.push(res.data.result)
            // 清空
            this.title = ''
            this.textarea = ''
            this.type = null
            this.$swal.fire({
              icon: 'success',
              title: '發送成功',
              confirmButtonColor: '#C2B593',
              iconColor: '#56C6BF'
            })
            this.quedialog = false
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '送出失敗',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430'
            })
          }
        })
      }
    },
    getPetFb(fb) {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        this.fbUser = fb
        this.$router.push(this.getPetFB[0] ? '/petpage/' + this.getPetFB[0]._id : '')
      }
    },
    filterDiscuss(filter) {
      this.filter = this.filtermodel
    },
    askName() {
      if (this.user.account === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請先登入會員',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        this.$router.push(this.getPet[0] ? '/petpage/' + this.getPet[0]._id : '')
      }
    }
  },
  async mounted() {
    await this.axios.get(process.env.VUE_APP_API + '/discuss/').then(res => {
      if (res.data.success) {
        this.discuss = res.data.result.reverse()
        this.discuss = res.data.result.map(item => {
          return item
        })
      }
    })
    await this.axios.get(process.env.VUE_APP_API + '/pets/').then(res => {
      if (res.data.success) {
        this.allPets = res.data.result.map(pet => {
          return pet
        })
      }
    })
    // 分類
    this.eatDis = this.discuss.filter(item => {
      return item.questiontype === '飲食'
    })
    this.lifeDis = this.discuss.filter(item => {
      return item.questiontype === '生活'
    })
    this.friendDis = this.discuss.filter(item => {
      return item.questiontype === '交友'
    })
    this.sickDis = this.discuss.filter(item => {
      return item.questiontype === '生病'
    })
    this.otherDis = this.discuss.filter(item => {
      return item.questiontype === '其他'
    })
  }
}
</script>
