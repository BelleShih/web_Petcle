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
            Petcle 是一個公開的寵物交流平台，使用者可以在這裡分享自己滿意的寵物照片，全部會員上傳的照片皆為公開狀態，加入會員後可以將喜歡的照片收藏在自己的療癒空間裡面，且隨時都可以進入療癒空間看這些可愛寵物照，療癒身心。<br>
            網站不定時會發佈一些與寵物相關的消息，也會在寵物百科定期上架寵物相關文章，讓會員們得到第一手寵物相關消息！
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
            首頁會列出所有會員上傳的照片，加入會員後，您就擁有一個屬於您的療癒空間，若有看到喜歡的照片，可以點擊照片右下角的星星按鈕，當按鈕轉為紅色代表照片已經添加到您的療癒相簿中！在相簿中您可以選擇照片以輪播或拍立得方式呈現，療癒您的身心。
          </p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="emoji_objects" color="primary" style="font-size:5rem" />
          <h6 class="about-h6">獲取新知與互動</h6>
          <p class="text-center">
            最新消息與寵物百科不定期會更新文章與消息，讓您隨時得到寵物相關的第一手資訊！在毛孩大小事留言版裡，您也可以點擊右下角的”我要發問“，即可將您的問題丟到留言板上與會員們互動，也可以點擊他人的留言，在下方回覆，讓整個討論區更熱鬧！
          </p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="email" color="primary" style="font-size:5rem" />
          <h6 class="about-h6">專屬的寵物信箱</h6>
          <p class="text-center">
            只要上傳您的寵物後，即可開通您的寵物信箱功能！可以與其他會員的寵物一起寫信交流，讓您的寶貝也可以交朋友～Ｐetcle 還貼心的為您設計了信件搜尋功能，讓您可以在眾多信件中找到重要信件，也可以查詢您的寄件紀錄，不用怕忘記回信內容喔！
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
