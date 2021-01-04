<template>
  <q-layout>
    <!-- 導覽列 -->
    <q-header elevated class="bg-white h-100" height-hint="98">
      <div class="flex row wrap justify-between nav-padding">
        <div class="col-12 col-lg-4 row flex-left flex-logo-justify">
          <q-btn dense unelevated exact :to="{ name: 'front.index' }">
            <img id="logo" src="../assets/petcle-logo.png" >
          </q-btn>
        </div>
        <ul class="flex row col-12 col-md-12 col-xl-6">
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.about' }" active-class="text-blue-3">關於 Petcle</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.news' }" active-class="text-blue-3">最新消息</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact :to="{ name: 'front.questions' }">毛孩大小事</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact @click="login = true" active-class="text-blue-3">登入</q-btn></li>
          <li class="menu_link"><q-btn dense unelevated exact @click="registered = true" active-class="text-blue-3">註冊</q-btn></li>
        </ul>
      </div>
      <!-- 登入 -->
      <q-dialog
        v-model="login"
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
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <div class="login-input text-center">
                帳號
                <input
                  v-model="account"
                  placeholder="請輸入帳號"
                  type="string"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || '請輸入帳號']"
                />
              </div>
              <div class="login-input text-center">
                密碼
                <input
                  v-model="password"
                  placeholder="請輸入密碼"
                  type="string"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || '請輸入密碼']"
                />
              </div>
              <div id="no-member-text" class="text-center"><a @click="registered = true; login = false">還不是會員嗎?趕快按我註冊</a></div>
              <div class="login-line"></div>
              <div class="login-btn flex flex-center">
                <q-btn rounded label="登入" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
      <!-- 註冊 -->
      <q-dialog
        v-model="registered"
      >
        <q-card class="flex row wrap registered" style="width: 800px; max-width: 80vw; height: 500px">
          <q-card-section class="col-xs-12 col-sm-12 col-md-4 col-xl-5" style="background:#C2B593">
            <div class="flex flex-center q-my-md column welcome">
              WELCOME
              <img id="registered-logo" src="../assets/petcle-logo-w.png">
            </div>
          </q-card-section>
          <q-card-section class="col-xs-12 col-sm-12 col-md-8 col-xl-7 q-pt-none flex flex-center column">
            <div class="registered-font">會員註冊</div>
            <div class="q-pa-md flex flex-center items-center">
              <q-form
                @submit="onSubmit"  @reset="onReset"  class="q-gutter-md registered-form"
              >
                <div class="registered-input">
                  名稱
                  <input
                    v-model="reg.name"
                    placeholder="請輸入名稱"
                    lazy-rules
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
                    lazy-rules
                    type="text"
                    style="position:relative;left:45px"
                  />
                </div>
                <div class="registered-input">
                  密碼
                  <input
                    v-model="reg.password1"
                    placeholder="請輸入密碼"
                    lazy-rules
                    type="text"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    style="position:relative;left:45px"
                  />
                </div>
                <div class="registered-input">
                  確認密碼
                  <input
                    v-model="reg.password2"
                    placeholder="請再次輸入密碼"
                    lazy-rules
                    type="text"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    style="position:relative;left:12px"
                  />
                </div>
                <div class="registered-input">
                  E-MAIL
                  <input
                    v-model="reg.email"
                    placeholder="請輸入Email"
                    lazy-rules
                    type="text"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    style="position:relative;left:20px"
                  />
                </div>
                <div class="q-gutter-sm registered-input">
                  是否有養寵物
                  <q-radio v-model="reg.pet" type="radio" val="true" label="是" />
                  <q-radio v-model="reg.pet" type="radio" val="false" label="否" />
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
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
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
      login: false,
      registered: false,
      shape: 'line',

      accept: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onReset () {
      this.name = null
      this.account = null
      this.password1 = null
      this.password2 = null
      this.email = null
      this.shape = null
      this.accept = false
    }
  }
}
</script>
