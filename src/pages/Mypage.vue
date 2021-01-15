<template>
  <q-page>
    <q-layout-container>
      <div class="flex row justify-around" style="padding:50px 0">
        <div class="col-12 col-md-3 flex column mypage_line">
          <div class="flex column flex-center">
            <img src="https://picsum.photos/200/200/?random=1">
            <h5>{{ user.name }}</h5>
            <p>@{{ user.account }}</p>
          </div>
          <div class="mypage_btnG flex column flex-center">
            <q-btn outline rounded color="primary" icon="add_circle_outline" label="上傳照片" @click="uploadphoto = true" size="16px" class="mypage_btn"/>
            <q-btn outline rounded color="primary" icon="settings" label="編輯照片" size="16px" @click="editMenu = !editMenu" class="mypage_btn"/>
            <q-btn outline rounded color="primary" icon="star" label="療癒空間" @click="space" size="16px" class="mypage_btn" :to="{ name: 'front.space' }"/>
            <q-btn outline rounded color="primary" icon="pets" label="我的寶貝" @click="petpage" size="16px" class="mypage_btn"/>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <container class="flex flex-center">
            <div class="row fit wrap items-start">
              <div class="col-6 col-md-6 col-lg-6 col-xl-3 q-pa-sm" v-for="(photo, index) in photos" :key="photo.file" :value="photo">
                <q-card class="my-card" style="height:17rem">
                  <img :src="photo.src">
                </q-card>
                <div class="q-pa-md" style="max-width: 300px">
                  <q-input
                    v-if="photo.edit"
                    v-model="photo.model"
                    filled
                    type="textarea"
                  />
                </div>
                <div v-if="editMenu" style="cursor:pointer">
                  <q-icon v-if="!photo.edit" name="create" color="primary" size="2rem" @click="edit(photo)"></q-icon>
                  <q-icon v-if="!photo.edit" name="delete_forever" color="negative" size="2rem" @click="del(photo, index)"></q-icon>
                  <q-icon v-if="photo.edit" name="save" color="secondary" size="2rem" @click="save(photo)"></q-icon>
                  <q-icon v-if="photo.edit" name="cancel" color="accent" size="2rem"  @click="cancel(photo)"></q-icon>
                </div>
              </div>
            </div>
          </container>
        </div>
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
                  <select class="col-12 col-lg-5 ULanimaltype" v-model="animalSelected" placeholder="選擇動物類型">
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
      <!-- 上傳成功視窗 -->
      <q-dialog v-model="uploadSuccess" persistent  transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white text-center" style="width: 300px">
          <q-card-section>
            <q-icon name="check_circle_outline" size="5rem" color="white"></q-icon>
          </q-card-section>

          <q-card-section class="q-pt-none">
            上傳成功
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup @click="uploadSuccess = false"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- 更新成功彈出視窗 -->
      <q-dialog v-model="updateSuccess" persistent  transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white text-center" style="width: 300px">
          <q-card-section>
            <q-icon name="check_circle_outline" size="5rem" color="white"></q-icon>
          </q-card-section>

          <q-card-section class="q-pt-none">
            更新成功
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup @click="updateSuccess = false"/>
          </q-card-actions>
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
      photos: [],
      updateSuccess: false,
      editMenu: false,
      uploadSuccess: false
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
        photo.append('breed', this.breedSelected._id)
        photo.append('bodypart', this.bodySelected._id)
        photo.append('description', this.textarea)

        this.axios.post(process.env.VUE_APP_API + '/photos/', photo)
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              res.data.result.title = res.data.result.description
              res.data.result.model = res.data.result.description
              res.data.result.animal01 = res.data.result.animal
              res.data.result.breeds01 = res.data.result.breeds
              res.data.result.bodyparts01 = res.data.result.bodyparts
              res.data.result.edit = false
              this.photos.push(res.data.result)
              // 清空
              this.photoFile = null
              this.animalSelected = ''
              this.breedSelected = ''
              this.bodySelected = ''
              this.textarea = ''
              this.uploadSuccess = true
            } else {
              alert('上傳錯誤')
            }
          })
      }
    },
    onReset_upload () {
      this.photoFile = null
      this.animalSelected = ''
      this.breedSelected = ''
      this.bodySelected = ''
      this.textarea = ''
    },
    cancel (photo) {
      photo.edit = false
      photo.model = photo.des
    },
    save (photo) {
      this.axios.patch(process.env.VUE_APP_API + '/photos/' + photo._id, { description: photo.model })
        .then(res => {
          if (res.data.success) {
            photo.edit = false
            photo.des = photo.model
            this.updateSuccess = true
          } else {
            alert('更新失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit (photo) {
      photo.edit = true
      photo.model = photo.des
    },
    del (photo, index) {
      this.axios.delete(process.env.VUE_APP_API + '/photos/' + photo._id)
        .then(res => {
          if (res.data.success) {
            this.photos.splice(index, 1)
          } else {
            alert('刪除失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
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
    // 抓使用者的圖片資料
    this.axios.get(process.env.VUE_APP_API + '/photos/user/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.photos = res.data.result.map(photo => {
            photo.src = process.env.VUE_APP_API + '/photos/file/' + photo.file
            photo.des = photo.description
            photo.model = photo.description
            photo.edit = false
            return photo
          })
        } else {
          alert('錯誤')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
