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
      <q-dialog
        v-model="login"
      >
      <!-- 登入 -->
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
                  v-model="name"
                  placeholder="請輸入帳號"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </div>
              <div class="login-input text-center">
                密碼
                <input
                  v-model="age"
                  placeholder="請輸入密碼"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </div>
              <div id="no-member-text" class="text-center"><a href="http://" >還不是會員嗎?趕快按我註冊</a></div>
              <div class="login-line"></div>
              <div class="login-btn flex flex-center">
                <q-btn rounded label="登入" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>

          </div>
        </q-card>
      </q-dialog>
      <!-- 註冊 -->
      <q-dialog
        v-model="registered"
      >
        <q-card class="flex row" style="width: 800px; max-width: 80vw; height: 500px">
          <q-card-section class="col-5 registered-left" style="background:#C2B593">
            <div class="flex flex-center q-my-md column welcome">
              WELCOME
              <img id="registered-logo" src="../assets/petcle-logo-w.png">
            </div>
          </q-card-section>
          <q-card-section class="col-7 q-pt-none flex flex-center column">
            <div class="registered-font">會員註冊</div>
            <div class="q-pa-md flex flex-center items-center">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div class="registered-input">
                  名稱
                  <input
                    v-model="name"
                    placeholder="請輸入帳號"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="registered-input">
                  帳號
                  <input
                    v-model="name"
                    placeholder="請輸入帳號"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="registered-input">
                  密碼
                  <input
                    v-model="age"
                    placeholder="請輸入密碼"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="registered-input">
                  確認密碼
                  <input
                    v-model="age"
                    placeholder="請輸入密碼"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="registered-input">
                  E-MAIL
                  <input
                    v-model="age"
                    placeholder="請輸入密碼"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="login-btn flex flex-center">
                  <q-btn rounded label="登入" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                  <q-btn rounded label="重置" type="reset" size="1.1rem" style="width:80px"/>
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
      login: false,
      registered: false
    }
  }
}
</script>
