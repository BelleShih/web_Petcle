<template>
  <q-layout id="mainLayout" style="width:100%">
    <!-- 導覽列 -->
    <q-header elevated class="bg-white" height-hint="98" style="width:100%">
      <div class="flex row wrap justify-between nav-padding">
        <div class="col-12 col-lg-4 row flex-left flex-logo-justify">
          <q-btn dense unelevated exact :to="{ name: 'front.index' }">
            <img id="logo" src="../assets/petcle-logo.png" >
          </q-btn>
        </div>
        <ul id="nav" class="flex row col-12 col-md-12 col-xl-6">
          <li><q-btn dense unelevated exact :to="{ name: 'front.about' }" active-class="text-blue-3">關於 Petcle</q-btn></li>
          <li><q-btn dense unelevated exact :to="{ name: 'front.news' }" active-class="text-blue-3">最新消息</q-btn></li>
          <li><q-btn dense unelevated exact :to="{ name: 'front.questions' }">毛孩大小事</q-btn></li>
          <li dense unelevated exact class="nav_line"></li>
          <li>
            <q-btn v-if="user.id.length === 0" dense unelevated exact @click="loginPage = true" active-class="text-blue-3">登入</q-btn>
            <q-btn v-if="user.id.length > 0" dense unelevated exact @click="logout" active-class="text-blue-3">登出</q-btn>
          </li>
          <li>
            <q-btn v-if="user.id.length === 0" dense unelevated exact @click="registeredPage = true" active-class="text-blue-3">註冊</q-btn>
            <q-btn-dropdown v-if="user.id.length > 0" dense unelevated exact active-class="text-blue-3" label="使用者" flat="true">
              <q-list style="background: #C2B593;color:white">
                <q-item clickable v-close-popup @click="onItemClick" style="padding-top:1rem" class="user_row" :to="{ name: 'front.mypage' }">
                  <q-item-section avatar>
                    <q-icon name="account_box" color="white" text-color="white" size="1.5rem"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu" >我的主頁</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onItemClick" class="user_row" :to="{ name: 'front.space' }">
                  <q-item-section avatar>
                    <q-icon name="star_rate" color="white" text-color="white" size="1.5rem"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu">療癒空間</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onItemClick" class="user_row" :to="{ name: 'front.petpage' }">
                  <q-item-section avatar>
                    <q-icon name="pets" color="white" text-color="white" size="1.5rem"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu">我的寶貝</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </li>
        </ul>
      </div>
    </q-header>
      <!-- 註冊 -->
      <q-dialog
        v-model="registeredPage"
        style="width:100%"
      >
        <q-card id="reg_dialog" class="flex row">
          <q-card-section class="col-xs-12 col-sm-12 col-md-12 col-xl-5" style="background:#C2B593">
            <div class="flex flex-center q-my-md column welcome">
              WELCOME
              <img id="registered-logo" src="../assets/petcle-logo-w.png">
            </div>
          </q-card-section>
          <q-card-section class="col-12 col-md-12 col-xl-7 flex flex-center column">
            <div class="registered-font">會員註冊</div>
            <div class="flex flex-center items-center">
              <q-form
                @submit.prevent="onSubmit_reg" @reset="onReset_reg"  class="q-gutter-md registered-form"
              >
                <div class="registered-input">
                  名稱
                  <input
                    v-model="reg.name"
                    placeholder="請輸入名稱"
                    type="text"
                    :state="nameState"
                    style="position:relative;left:45px"
                  />
                </div>
                <div class="registered-input">
                  帳號
                  <input
                    v-model="reg.account"
                    placeholder="請輸入帳號"
                    type="text"
                    :state="accountState_reg"
                    style="position:relative;left:45px"
                  />
                </div>
                <div class="registered-input">
                  密碼
                  <input
                    v-model="reg.password1"
                    placeholder="請輸入密碼"
                    type="password"
                    :state="passwordState_reg"
                    style="position:relative;left:45px"
                  />
                </div>
                <div class="registered-input">
                  確認密碼
                  <input
                    v-model="reg.password2"
                    placeholder="請再次輸入密碼"
                    type="password"
                    style="position:relative;left:12px"
                  />
                </div>
                <div class="registered-input">
                  E-MAIL
                  <input
                    v-model="reg.email"
                    placeholder="請輸入Email"
                    type="text"
                    :state="emailState"
                    style="position:relative;left:20px"
                  />
                </div>
                <div class="q-gutter-sm registered-input">
                  是否有養寵物
                    <q-radio v-model="reg.pet" type="radio" :val="true" label="是" />
                    <q-radio v-model="reg.pet" type="radio" :val="false" label="否" />
                </div>
                <div class="registered-btn flex flex-center">
                  <q-btn rounded label="註冊" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                  <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    <!-- 登入 -->
      <q-dialog
        v-model="loginPage"
      >
        <q-card style="width: 500px; max-width: 80vw; height: 600px">
          <q-card-section>
            <div class="flex flex-center q-my-md">
              <img id="logo-login" src="../assets/petcle-logo.png">
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none flex flex-center column">
            <div class="login-line"></div>
            <div class="login-font">會員登入</div>
            <div class="login-line"></div>
          </q-card-section>
          <div class="q-pa-md flex flex-center items-center login-input-div">
            <q-form
              @submit="onSubmit_log"
              @reset="onReset_log"
              class="q-gutter-md"
            >
              <div class="login-input text-center">
                帳號
                <input
                  v-model="log.account"
                  placeholder="請輸入帳號"
                  type="text"
                  :state="accountState"
                />
              </div>
              <div class="login-input text-center">
                密碼
                <input
                  v-model="log.password"
                  placeholder="請輸入密碼"
                  type="password"
                  :state="passwordState"
                />
              </div>
              <div id="no-member-text" class="text-center"><a @click="registeredPage = true; loginPage = false">還不是會員嗎?趕快按我註冊</a></div>
              <div class="login-line"></div>
              <div class="login-btn flex flex-center">
                <q-btn rounded label="登入" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- footer -->
    <q-footer elevated class="text-white footer">
      <div class="flex flex-center" style="height:100%">
        <div class="flex row justify-end footer_row" style="width:100%;height:100%">
          <div class="col-xs-10 col-sm-10 col-md-12 col-lg-2 flex row  footer_coll" >
            <q-icon name="facebook" size="45px" style="margin-bottom:1rem"></q-icon>
            <p>Copyright © 2020 Petcle. All rights reserved.</p>
          </div>
          <div class="col-xs-10 col-sm-10 col-md-12 col-lg-9 flex row justify-end footer_col02">
            <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 flex column ">
              <div class="footer_col">
                <p style="font-weight:800;font-size:1.2rem;">Petcle</p>
                <ul class="footer_li">
                  <li>service@petcle.com</li>
                  <li>(270) 555-0117</li>
                  <li>3517 W. Gray St. Utica, Pennsylvania</li>
                </ul>
              </div>
          </div>
          <div class="col-xs-10 col-sm-5 col-md-3 col-lg-2 flex column">
            <div class="flex column justify-start align-start footer_col">
              <p class="footer_h6">毛孩大小事</p>
              <q-btn :to="{ name: 'front.questions' }" align="left">網友疑問</q-btn>
              <q-btn :to="{ name: 'front.questions' }" align="left">我要發問</q-btn>
              <q-btn :to="{ name: 'front.pedia' }" align="left">寵物百科</q-btn>
            </div>
          </div>
          <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 flex column ">
            <div class="flex column justify-start align-start footer_col">
              <p class="footer_h6">網站會員</p>
              <q-btn @click="loginPage = true" align="left">登入會員</q-btn>
              <q-btn @click="registeredPage = true" align="left">註冊會員</q-btn>
              <q-btn :to="{ name: 'front.pedia' }" align="left">會員權益與條款</q-btn>
            </div>
          </div>

          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      reg: {
        name: '',
        account: '',
        password1: '',
        password2: '',
        email: '',
        pet: null
      },
      log: {
        account: '',
        password: ''
      },
      accept: false,
      loginPage: false,
      registeredPage: false
    }
  },
  computed: {
    accountState () {
      if (this.log.account.length === 0) {
        return null
      } else if (this.log.account.length >= 4 && this.log.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState () {
      if (this.log.password.length === 0) {
        return null
      } else if (this.log.password.length >= 4 && this.log.password.length <= 20) {
        return true
      } else {
        return false
      }
    },
    nameState () {
      if (this.reg.name.length === 0) {
        return null
      } else if (this.reg.name.length >= 1 && this.reg.name.length <= 20) {
        return true
      } else {
        return false
      }
    },
    accountState_reg () {
      if (this.reg.account.length === 0) {
        return null
      } else if (this.reg.account.length >= 4 && this.reg.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState_reg () {
      if (this.reg.password1.length === 0) {
        return null
      } else if (this.reg.password1.length >= 4 && this.reg.password1.length <= 20 && this.reg.password1 === this.reg.password2) {
        return true
      } else {
        return false
      }
    },
    emailState () {
      if (this.reg.email.length === 0) {
        return null
      } else if (this.reg.email.length >= 1) {
        return true
      } else {
        return false
      }
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onSubmit_reg () {
      if (this.accountState_reg && this.passwordState_reg && this.nameState && this.emailState && this.reg.pet !== null) {
        this.axios
          .post(process.env.VUE_APP_API + '/users/', this.reg)
          .then(res => {
            if (res.data.success) {
              alert('註冊成功')
              this.registeredPage = false
              this.loginPage = true
            } else {
              alert('發生錯誤')
            }
          })
          .catch(err => {
            console.log(err.response.data.message)
          })
      }
    },
    onSubmit_log () {
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/login', this.log)
          .then(res => {
            if (res.data.success) {
              this.$store.commit('login', res.data.result)
              alert('登入成功')
              this.loginPage = false
              this.$router.push('/index')
            } else {
              alert('發生錯誤')
            }
          })
          .catch(err => {
            console.log(err.response.data.message)
          })
      }
    },
    onReset_log () {
      this.account = ''
      this.password = ''
    },
    onReset_reg () {
      this.reg.name = ''
      this.reg.account = ''
      this.reg.password1 = ''
      this.reg.password2 = ''
      this.reg.email = ''
      this.reg.pet = null
    },
    logout () {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            alert('登出成功')
            this.$store.commit('logout')

            if (this.$router.path !== '/') {
              this.$router.push('/index')
            }
          } else {
            alert('錯誤')
          }
        })
        .catch(error => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          if (this.user.id.length > 0) {
            if (!res.data) {
              alert('登入時效已過')
              this.$store.commit('logout')
              if (this.$route.path !== '/') {
                this.$router.push('/index')
              }
            }
          }
        })
        .catch(() => {
          alert('發生錯誤')
          this.$store.commit('logout')
          if (this.$route.path !== '/') {
            this.$router.push('/index')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 50000000)
  }
}
</script>
