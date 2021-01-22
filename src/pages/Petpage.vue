<template>
  <q-page id="petpage" class="container flex-center h-100">
    <div class="row flex-center h-100">
      <!-- 寵物照片 -->
      <div class="flex flex-center col-10 col-lg-6 box h-100 ">
        <img src="../assets/03.jpg">
      </div>
      <!-- 右半資料 -->
      <div class="column col-10 col-lg-6 right justify-center">
        <q-icon name="edit" class="edit_icon" size="1.5rem" color="accent"></q-icon>
        <div class="row items-center">
          <div class="col-3 name">名字</div>
          <div class="col-3">@使用者</div>
        </div>
        <!-- 寄信給他 -->
        <q-btn icon="mail" color="primary" size="20px" rounded class="mail_btn">寄信給牠</q-btn>
        <!-- 寵物類型 -->
        <div class="row type">
          <div class="col-3">狗狗</div>
          <div class="col-3">薩摩耶</div>
        </div>
        <!-- 寵物自我介紹 -->
        <div>
          <div class="about_title">關於我</div>
          <p>介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹介紹</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
