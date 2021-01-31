<template>
  <q-layout id="mainLayout" style="width:100%">
    <!-- 導覽列 -->
    <q-header elevated class="bg-white" height-hint="98" style="width:100%">
      <div class="flex row wrap justify-between nav-padding">
        <div class="col-12 col-lg-4 row flex-left flex-logo-justify">
          <q-btn dense unelevated exact :to="{ name: 'front.index' }">
            <img id="logo" src="../assets/petcle-logo.png" />
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
            <q-btn-dropdown v-if="user.id.length > 0" dense unelevated exact active-class="text-blue-3" :label="user.name">
              <q-list style="background: #C2B593;color:white">
                <q-item clickable v-close-popup style="padding-top:1rem" class="user_row" :to="{ name: 'front.mypage' }">
                  <q-item-section avatar>
                    <q-icon name="account_box" color="white" text-color="white" size="1.5rem" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu">我的主頁</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup class="user_row" :to="{ name: 'front.space' }">
                  <q-item-section avatar>
                    <q-icon name="star_rate" color="white" text-color="white" size="1.5rem" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu">療癒空間</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup class="user_row" :to="{ name: 'front.petpage' }">
                  <q-item-section avatar>
                    <q-icon name="pets" color="white" text-color="white" size="1.5rem" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="user_menu">我的寶貝</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </li>
          <li v-if="user.id.length > 0 && admin === true">
            <q-btn dense unelevated exact active-class="text-blue-3" :to="{ name: 'admin.index' }">管理後台</q-btn>
          </li>
        </ul>
      </div>
    </q-header>
    <!-- 註冊 -->
    <q-dialog v-model="registeredPage" style="width:100%">
      <q-card id="reg_dialog" class="flex row">
        <q-card-section class="col-xs-12 col-sm-12 col-md-5 col-xl-5 left">
          <div class="flex flex-center q-my-md column welcome">
            WELCOME
            <img id="registered-logo" src="../assets/petcle-logo-w.png" />
            <div class="registered-font col-12">會員註冊</div>
          </div>
        </q-card-section>
        <q-card-section class="col-xs-12 col-sm-12 col-md-7 col-xl-7 flex flex-center column">
          <q-form @submit.prevent="onSubmit_reg" @reset="onReset_reg" class="flex justify-center registered-form">
            <div class="registered-input row flex-center">
              <div class="account_text col-3">名稱</div>
              <q-input
              v-model="reg.name"
              placeholder="請輸入名稱"
              type="text"
              :state="nameState"
              required
              class="input col-7"
              :rules="[
                val => !!val || '* 必填'
              ]" />
            </div>
            <div class="registered-input row flex-center">
              <div class="account_text col-3">帳號</div>
              <q-input
              v-model="reg.account"
              placeholder="請輸入帳號"
              type="text"
              :state="accountState_reg"
              required
              class="input col-7"
              :rules="[
                val => !!val || '* 必填',
                val => val && val.length >= 4 || '帳號為4個字(含)以上'
              ]" />
            </div>
            <div class="registered-input row flex-center">
              <div class="account_text col-3">密碼</div>
              <q-input
                v-model="reg.password1"
                placeholder="請輸入密碼"
                type="password"
                :state="passwordState_reg"
                required
                class="input col-7"
                :rules="[
                  val => !!val || '* 必填',
                  val => val && val.length >= 4 || '密碼為4個字(含)以上'
                ]"
              />
            </div>
            <div class="registered-input row flex-center">
              <div class="account_text col-3">確認密碼</div>
              <q-input
              v-model="reg.password2"
              placeholder="請再次輸入密碼"
              type="password"
              required
              class="input col-7"
              :rules="[
                val => !!val || '* 請再次輸入密碼'
              ]"
              />
            </div>
            <div class="registered-input row flex-center">
              <div class="account_text col-3">E-MAIL</div>
              <q-input
              v-model="reg.email"
              placeholder="請輸入Email"
              type="email"
              :state="emailState"
              required
              class="input col-7"
              :rules="[
                val => !!val || '* 必填',
                val => val.includes('@') || '請輸入電子信箱正確格式'
              ]" />
            </div>
            <div class="q-gutter-sm registered-input row flex-center">
              是否有養寵物
              <q-radio v-model="reg.pet" type="radio" :val="true" label="是" />
              <q-radio v-model="reg.pet" type="radio" :val="false" label="否" />
            </div>
            <div class="registered-btn flex flex-center">
              <q-btn rounded label="註冊" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px" />
              <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 登入 -->
    <q-dialog v-model="loginPage" id="login">
      <q-card style="width: 500px; max-width: 80vw; height: 600px">
        <q-card-section>
          <div class="flex flex-center q-my-md">
            <img id="logo-login" src="../assets/petcle-logo.png" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center column">
          <div class="login-line"></div>
          <div class="login-font">會員登入</div>
          <div class="login-line"></div>
        </q-card-section>
        <div class="q-pa-md flex justify-around login-input-div">
          <q-form @submit="onSubmit_log" @reset="onReset_log" class="q-gutter-md flex  flex-center">
            <div class="row flex-center login-input">
              <div class="account_text col-2">帳號</div>
              <q-input
              v-model="log.account"
              placeholder="請輸入帳號"
              type="text"
              :state="accountState"
              required
              class="input col-6"
              :rules="[
                val => !!val || '* 必填',
                val => val && val.length > 3 || '帳號為3個字以上'
              ]"
              />
            </div>
            <div class="row flex-center login-input">
              <div class="account_text col-2">密碼</div>
                <q-input
                v-model="log.password"
                placeholder="請輸入密碼"
                type="password"
                :state="passwordState"
                required
                class="input col-6"
                :rules="[
                  val => !!val || '* 必填',
                  val => val && val.length > 3 || '密碼為3個字以上'
                ]"/>
            </div>
            <div id="no-member-text" class="text-center">
              <a
                @click="
                  registeredPage = true
                  loginPage = false
                "
              >
                還不是會員嗎?趕快按我註冊
              </a>
            </div>
            <div class="login-line"></div>
            <div class="login-btn flex flex-center">
              <q-btn rounded label="登入" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px" />
              <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px" />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- footer -->
    <q-footer id="footer">
      <div class="container footer">
        <div class="flex row justify-around" style="margin:50px 0">
          <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-4 left">
            <q-icon name="facebook" size="45px" style="margin-bottom:1rem"></q-icon>
            <p>Copyright © 2020 Petcle. All rights reserved.</p>
          </div>
          <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-2 footer_col">
            <h6>Petcle</h6>
            <ul class="footer_li">
              <li>service@petcle.com</li>
              <li>(270) 555-0117</li>
              <li>3517 W. Gray St. Utica, Pennsylvania</li>
            </ul>
          </div>
          <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-2 footer_col">
            <h6>毛孩大小事</h6>
            <q-list class="footer_li">
              <q-item clickable v-ripple :to="{ name: 'front.questions' }">
                <q-item-section>網友疑問</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'front.news' }">
                <q-item-section>最新消息</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'front.pedia' }">
                <q-item-section>寵物百科</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-2 footer_col">
            <h6>網站會員</h6>
            <q-list class="footer_li">
              <q-item clickable v-ripple :to="{ name: 'front.index' }" @click="loginPage = true">
                <q-item-section>登入會員</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'front.index' }" @click="registeredPage = true">
                <q-item-section>註冊會員</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>會員權益與條款</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
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
    accountState() {
      if (this.log.account.length === 0) {
        return null
      } else if (this.log.account.length >= 4 && this.log.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState() {
      if (this.log.password.length === 0) {
        return null
      } else if (this.log.password.length >= 4 && this.log.password.length <= 20) {
        return true
      } else {
        return false
      }
    },
    nameState() {
      if (this.reg.name.length === 0) {
        return null
      } else if (this.reg.name.length >= 1 && this.reg.name.length <= 20) {
        return true
      } else {
        return false
      }
    },
    accountState_reg() {
      if (this.reg.account.length === 0) {
        return null
      } else if (this.reg.account.length >= 4 && this.reg.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState_reg() {
      if (this.reg.password1.length === 0) {
        return null
      } else if (this.reg.password1.length >= 4 && this.reg.password1.length <= 20 && this.reg.password1 === this.reg.password2) {
        return true
      } else {
        return false
      }
    },
    emailState() {
      if (this.reg.email.length === 0) {
        return null
      } else if (this.reg.email.length >= 1) {
        return true
      } else {
        return false
      }
    },
    user() {
      return this.$store.state.user
    },
    // 判斷是否為管理員
    admin() {
      if (this.user.account === 'admin') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSubmit_reg() {
      if (this.accountState_reg && this.passwordState_reg && this.nameState && this.emailState && this.reg.pet !== null) {
        this.axios
          .post(process.env.VUE_APP_API + '/users/', this.reg)
          .then(res => {
            if (res.data.success) {
              this.$swal.fire({
                icon: 'success',
                title: '註冊成功',
                confirmButtonColor: '#C2B593',
                iconColor: '#56C6BF',
                border: 'none'
              })
              this.registeredPage = false
              this.log.account = ''
              this.log.password = ''
              this.loginPage = true
            } else {
              this.$swal.fire({
                icon: 'error',
                title: '發生錯誤',
                confirmButtonColor: '#C2B593',
                iconColor: '#8d2430',
                border: 'none'
              })
            }
          })
          .catch(err => {
            console.log(err.response.data.message)
          })
      }
    },
    onSubmit_log() {
      if (this.accountState && this.passwordState) {
        this.axios
          .post(process.env.VUE_APP_API + '/users/login', this.log)
          .then(res => {
            if (res.data.success) {
              this.$store.commit('login', res.data.result)
              this.$swal.fire({
                icon: 'success',
                title: '登入成功',
                confirmButtonColor: '#C2B593',
                iconColor: '#56C6BF',
                border: 'none'
              })
              this.log.account = ''
              this.log.password = ''
              this.loginPage = false
              this.$router.push('/index')
            } else {
              this.$swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '登入失敗',
                confirmButtonColor: '#C2B593',
                iconColor: '#8d2430',
                border: 'none'
              })
            }
          })
          .catch(err => {
            console.log(err.response.data.message)
          })
      }
    },
    onReset_log() {
      this.account = ''
      this.password = ''
    },
    onReset_reg() {
      this.reg.name = ''
      this.reg.account = ''
      this.reg.password1 = ''
      this.reg.password2 = ''
      this.reg.email = ''
      this.reg.pet = null
    },
    logout() {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            this.$swal.fire({
              icon: 'success',
              title: '登出成功',
              confirmButtonColor: '#C2B593',
              iconColor: '#56C6BF'
            })
            this.$store.commit('logout')
            if (this.$router.path !== '/') {
              this.$router.push('/index')
            }
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '登出錯誤',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430'
            })
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
    heartbeat() {
      this.axios
        .get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          if (this.user.id.length > 0) {
            if (!res.data) {
              this.$swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過',
                confirmButtonColor: '#C2B593',
                iconColor: '#8d2430'
              })
              this.$store.commit('logout')
              if (this.$route.path !== '/') {
                this.$router.push('/index')
              }
            }
          }
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: '發生錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430'
          })
          this.$store.commit('logout')
          if (this.$route.path !== '/') {
            this.$router.push('/index')
          }
        })
    }
  },
  mounted() {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 50000)
  }
}
</script>
