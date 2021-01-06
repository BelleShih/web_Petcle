<template>
  <q-page>
    <q-layout-container>
      <!-- 關於我們 -->
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
      <!-- 裝飾色塊 -->
      <div id="about-cube"></div>
      <!-- 三個重點區 -->
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
      <!-- 聯絡我們表單 -->
      <div id="csForm">
        <q-form style="width:100%">
          <div class="flex flex-center row" style="width:100%;border:1px solid white">
            <div class="col-xs-12 col-md-2 col-lg-2 flex column" style="border-right:1px solid white;height:100%">
              <p>聯絡我們</p>
              <p>CONTENT US</p>
            </div>
            <div class="col-xs-12 col-md-8 col-lg-8 flex column">
              <div class="col-12 col-md-8 col-lg-8 flex row flex-center">
                <div>
                  <div>
                    <input v-model="sender" placeholder="寄件者" :dense="dense" class="about_input"/>
                  </div>
                  <div>
                    <input v-model="sender" placeholder="寄件者" :dense="dense" class="about_input"/>
                  </div>
                  <div>
                    <input v-model="sender" placeholder="寄件者" :dense="dense" class="about_input"/>
                  </div>
                </div>
                <div>
                  <q-input
                      v-model="FormText"
                      filled
                      clearable
                      type="textarea"
                      color="secondary"
                      maxlength="50"
                      label="說明文字"
                      hint="*說明限50字內"
                      class="about_textarea"
                      :shadow-text="textareaShadowText"
                      @keydown="processTextareaFill"
                      @focus="processTextareaFill"
                    />
                </div>
              </div>
              <div class="col-12 col-md-2 col-lg-2">
                <q-btn color="black" class="full-width" label="Full-width" />
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </q-layout-container>
  </q-page>
</template>
