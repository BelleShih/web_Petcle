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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut iure alias impedit voluptate! Cumque voluptate exercitationem illo earum nemo beatae
            rerum, voluptates est. Ab obcaecati ex optio nihil? Aspernatur perspiciatis minima pariatur sit, labore aperiam in. Corrupti eum repellat omnis
            similique molestiae? Magnam, magni doloribus. Facilis inventore vel distinctio et nisi ab eius perspiciatis temporibus, quidem aperiam numquam earum
            omnis ipsum molestiae ducimus, officia voluptate quibusdam incidunt veniam harum sit alias tempora asperiores architecto.
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
              <p>CONTENT US</p>
              <div id="form_line"></div>
            </div>
            <div class="col-xs-12 col-md-8 col-lg-8 flex column">
              <div class="col-12 col-md-8 col-lg-8 flex row flex-center">
                <div class="flex column col-12 col-lg-6">
                  <div class="about_input_div">
                    <input v-model="sender" placeholder="寄件者" class="about_input" />
                  </div>
                  <div class="about_input_div">
                    <input v-model="sender" placeholder="電子信箱" class="about_input" />
                  </div>
                  <div class="about_input_div">
                    <input v-model="sender" placeholder="主旨" :dense="dense" class="about_input" />
                  </div>
                </div>
                <div class="flex col-12 col-lg-6 about_textarea ">
                  <textarea v-model="FormText" type="textarea" color="secondary" maxlength="50" placeholder="想說的話" />
                </div>
              </div>
              <div class="col-12 col-md-2 col-lg-2 form_btn">
                <q-btn color="white" class="full-width" label="送出" />
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </q-layout-container>
  </q-page>
</template>
