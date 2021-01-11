<template>
  <q-page>
    <q-layout-container>
      <div class="flex row flex-center" style="padding-top:100px">
        <div class="col-12 col-md-3 flex column flex-center" style="border-right:1px solid #333">
          <div class="flex column flex-center">
            <img src="https://picsum.photos/200/200/?random=1">
            <h5>{{ user.name }}</h5>
            <p>@{{ user.account }}</p>
          </div>
          <div class="mypage_btnG flex column">
            <q-btn outline rounded color="primary" icon="add_circle_outline" label="上傳照片" @click="uploadphoto = true" size="16px" class="mypage_btn"/>
            <q-btn outline rounded color="primary" icon="settings" label="編輯照片" @click="editphoto" size="16px" class="mypage_btn"/>
            <q-btn outline rounded color="primary" icon="star" label="療癒空間" @click="space" size="16px" class="mypage_btn"/>
            <q-btn outline rounded color="primary" icon="pets" label="我的寶貝" @click="petpage" size="16px" class="mypage_btn"/>
          </div>
        </div>
        <div class="col-12 col-md-8"></div>
      </div>
      <!-- 上傳照片彈出視窗 -->
      <q-dialog v-model="uploadphoto">
        <q-card id="upload_dialog" class="flex row">
          <div class="col-12 flex flex-center" style="background: #56C6BF;height:20%">
            <p class="upload_title">上傳照片</p>
          </div>
          <div class="col-12 flex flex-center cloumn" style="height:80%">
            <q-form
              @submit="onSubmit_upload"
              @reset="onReset_upload"
              style="width:80%"
            >
                <!-- 檔案上傳 -->
                <q-file v-model="photoFile" filled bottom-slots counter label="選擇檔案" style="margin-bottom:1rem">
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="model = null" class="cursor-pointer" />
                  </template>
                  <template v-slot:hint>
                    *僅接受jpeg、png格式，且檔案不超過1KB
                  </template>
                </q-file>
                <!-- 選擇哪種動物 & 類型 -->
                <div class="flex row justify-between" style="margin-bottom:1rem">
                  <select class="col-12 col-lg-6 ULanimaltype" v-model="animalSelected" placeholder="選擇動物類型">
                    <option value="" disabled selected>選擇你的動物種類</option>
                    <option v-for="animal in animals" :key="animal.name" :value="animal">{{ animal.name }}</option>
                  </select>
                  <select class="col-12 col-lg-6 ULanimaltype" v-model="breedSelected" placeholder="選擇你的動物品種">
                    <option value="" disabled selected>選擇你的動物品種</option>
                    <option v-for="breed in selectedBreed" :key="breed.name" :value="breed">{{ breed.name }}</option>
                  </select>
                </div>
                <!-- 部位 -->
                <select class="col-12 ULanimaltype_bp" v-model="bodySelected" placeholder="選擇你的動物部位">
                  <option value="" disabled selected>選擇你的動物部位</option>
                  <option v-for="bodypart in selectedBodypart" :key="bodypart.name" :value="bodypart">{{ bodypart.name }}</option>
                </select>
                <!-- 照片說明 -->
                <q-input
                  v-model="textarea"
                  filled
                  clearable
                  type="textarea"
                  color="secondary"
                  label="說明文字"
                  hint="*說明限50字內"
                />
              <div class="login-btn flex flex-center">
                <q-btn rounded label="上傳" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
          <q-icon name="cancel" size="40px" color="white" class="absolute UPcancel" @click="uploadphoto = false"></q-icon>
        </q-card>
      </q-dialog>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  name: 'Mypage',
  data () {
    return {
      uploadphoto: false,
      photoFile: '',
      animalSelected: '',
      breedSelected: '',
      bodySelected: '',
      textarea: '',
      animals: [],
      photos: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    selectedBreed () {
      return this.animalSelected.breeds
    },
    selectedBodypart () {
      return this.animalSelected.bodypart
    }
  },
  methods: {
    onSubmit_upload () {
      if (this.photoFile.size > 1024 * 1024) {
        alert('圖片太大')
      } else if (!this.photoFile.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const photo = new FormData()
        photo.append('image', this.photoFile)
        photo.append('animal', this.animalSelected._id)
        photo.append('breed', this.breedSelected)
        photo.append('bodypart', this.bodySelected)
        photo.append('description', this.textarea)

        this.axios.post(process.env.VUE_APP_API + '/photos/', photo)
          .then(res => {
            this.photos.push(res.data.result)
            this.photoFile = null
            this.animalSelected = ''
            this.breedSelected = ''
            this.bodySelected = ''
            this.textarea = ''
          })
      }
    },
    onReset_upload () {}
  },
  // 抓全部的動物資料
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/animals/')
      .then(res => {
        if (res.data.success) {
          this.animals = res.data.result
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
    // this.axios.get( process.env.VUE_APP_API + '/photos/user/' + this.user.id)
    //   .then(res => {
    //     if (res.data.success) {
    //       this.photos = res.data.result.map(data => {
    //         data.src = process.env.VUE_APP_API + 'albums/file/' + photos.File
    //         data.title = photos.description
    //         data.model = photos.description
    //         data.edit = false
    //       })
    //     } else {
    //       alert('錯誤')
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
}
</script>
