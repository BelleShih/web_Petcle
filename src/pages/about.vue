<template>
  <q-page>
    <q-layout-container>
      <div class="flex column flex-center text-center" style="color:#C2B593;letter-spacing: 0.5rem;">
        <img id="about-logo" src="../assets/petcle-logo.png">
        <h7>療癒力就是毛孩的超能力</h7>
      </div>
      <div class="flex row flex-center about-title relative-position">
          <div class="col-12 col-lg-5" style="height:450px">
            <img class="about-img" src="~assets/aboutphoto.jpg">
          </div>
          <div class="col-12 col-lg-7 about-text" style="">
            <b style="font-size:1.5rem">關於我們  ABOUT US</b>
            <div id="about-line"></div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut iure alias impedit voluptate! Cumque voluptate exercitationem illo earum nemo beatae rerum, voluptates est. Ab obcaecati ex optio nihil? Aspernatur perspiciatis minima pariatur sit, labore aperiam in. Corrupti eum repellat omnis similique molestiae? Magnam, magni doloribus. Facilis inventore vel distinctio et nisi ab eius perspiciatis temporibus, quidem aperiam numquam earum omnis ipsum molestiae ducimus, officia voluptate quibusdam incidunt veniam harum sit alias tempora asperiores architecto.
            </p>
          </div>
      </div>
      <div id="about-cube"></div>
      <div class="flex row flex-center" style="margin-top:50px">
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem"/>
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.</p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem"/>
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.</p>
        </div>
        <div class="col-12 col-lg-3 flex column flex-center q-pa-lg">
          <q-icon name="star" color="primary" style="font-size:5rem"/>
          <h6 class="about-h6">收藏喜愛的照片</h6>
          <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque at aperiam nostrum fugit, distinctio aspernatur perferendis assumenda in, iste consectetur impedit omnis! Itaque, in eveniet laborum velit assumenda.</p>
        </div>
      </div>
      <q-form>
        <div class="flex">
          <div class="col-12 col-md-2 flex column flex-center">
          <p>聯絡我們</p>
          <p>CONTENT US</p>
        </div>
        <div class="col-12 col-md-8">
          <input v-model="sender" placeholder="寄件者" :dense="dense" />
        </div>
        </div>
      </q-form>
    </q-layout-container>
  </q-page>
</template>
