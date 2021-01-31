<template>
  <q-page>
    <q-layout-container>
      <!-- 關於我們 -->
      <div class="flex column flex-center text-center" style="color:#C2B593;letter-spacing: 0.5rem;">
        <img id="about-logo" src="../assets/petcle-logo.png" />
        <h7>療癒力就是毛孩的超能力</h7>
      </div>
      <div class="flex row flex-center about-title relative-position">
        <div class="col-12 col-lg-5" style="height:450px">
          <img class="about-img" src="~assets/aboutphoto.jpg" />
        </div>
        <div class="col-12 col-lg-7 about-text" style="">
          <b style="font-size:1.5rem">關於我們 ABOUT US</b>
          <div id="about-line"></div>
          <p>
            Petcle
            是一個公開的寵物交流平台，使用者可以在這裡分享自己滿意的寵物照片，若有看到喜歡的照片也可以收藏在自己的空間裡面，隨時都可以回來看這些可愛寵物，療癒身心，網站不定時會發佈一些與寵物相關的消息，也會在寵物百科定期上架寵物相關文章。
          </p>
        </div>
      </div>
      <!-- 裝飾色塊 -->
      <div id="about-cube"></div>
      <!-- 三個重點區 -->
      <div class="flex row flex-center" style="margin-top:50px">
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem" />
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste
            consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.
          </p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem" />
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste
            consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.
          </p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem" />
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste
            consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.
          </p>
        </div>
      </div>
      <!-- 聯絡我們表單 -->
      <div id="csForm">
        <q-form style="width:100%;height:100%">
          <div class="flex flex-center row form_border">
            <div class="col-xs-12 col-md-2 col-lg-2 flex column about_left" style="color:white">
              <h6 style="margin-bottom:0.3rem">聯絡我們</h6>
              <p>CONTACT US</p>
              <div id="form_line"></div>
            </div>
            <q-form class="col-xs-12 col-md-8 col-lg-8 flex column">
              <div class="col-12 col-md-8 col-lg-8 flex row flex-center">
                <div class="flex column col-12 col-lg-6">
                  <div class="about_input_div">
                    <input v-model="sender" placeholder="寄件者" class="about_input" />
                  </div>
                  <div class="about_input_div">
                    <input v-model="mail" placeholder="電子信箱" class="about_input" />
                  </div>
                  <div class="about_input_div">
                    <input v-model="title" placeholder="主旨" :dense="dense" class="about_input" />
                  </div>
                </div>
                <div class="flex col-12 col-lg-6 about_textarea ">
                  <textarea v-model="description" type="textarea" color="secondary" maxlength="50" placeholder="想說的話" />
                </div>
              </div>
              <div class="col-12 col-md-2 col-lg-2 form_btn">
                <q-btn color="white" class="full-width" label="送出" @click="onSubmit_mail()"/>
              </div>
            </q-form>
          </div>
        </q-form>
      </div>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      sender: '',
      mail: '',
      title: '',
      description: ''
    }
  },
  methods: {
    onSubmit_mail() {
      if (this.sender === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請填寫寄件者',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else if (this.mail === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請填寫信箱',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else if (this.title === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請填寫主旨',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else if (this.description === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '請填寫想說的話',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        const mail = {
          sender: this.sender,
          mail: this.mail,
          title: this.title,
          description: this.description
        }
        this.axios.post(process.env.VUE_APP_API + '/contacts/', mail)
          .then(res => {
            if (res.data.success) {
              this.$swal.fire({
                icon: 'success',
                title: '發送成功',
                text: '親愛的使用者您好，您的來信已收到，我們會盡快處理及回覆，謝謝！',
                confirmButtonColor: '#C2B593',
                iconColor: '#56C6BF'
              })
              this.sender = ''
              this.mail = ''
              this.title = ''
              this.description = ''
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
    }
  }

}
</script>
