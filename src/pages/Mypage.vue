<template>
  <q-page id="mypage">
    <q-layout-container>
      <div class="row justify-around" style="padding:100px 0">
        <div class="col-12 col-md-3 flex column mypage_line">
          <div class="flex flex-center user_des">
            <q-avatar class="img" size="120px">
              <img src="../assets/userphoto-01.jpg" />
            </q-avatar>
            <div class="flex user">
              <p class="title">{{ user.name }}</p>
              <p class="account">@{{ user.account }}</p>
            </div>
          </div>
          <!-- 按鈕區 -->
          <div class="flex flex-center mypage_btnG">
            <q-btn flat rounded color="primary" icon="add_circle_outline" @click="uploadphoto = true" size="16px" class="mypage_btn">
              <div class="btn_title">上傳照片</div>
            </q-btn>
            <q-btn flat rounded color="primary" icon="settings" size="16px" @click="editMenu = !editMenu" class="mypage_btn">
              <div class="btn_title">編輯照片</div>
            </q-btn>
            <q-btn flat rounded color="primary" icon="star" @click="space" size="16px" class="mypage_btn" :to="{ name: 'front.space' }">
              <div class="btn_title">療癒空間</div>
            </q-btn>
            <q-btn flat rounded color="primary" icon="pets" @click="petpage" size="16px" class="mypage_btn" :to="{ name: 'front.petpage' }">
              <div class="btn_title">我的寶貝</div>
            </q-btn>
          </div>
        </div>
        <!-- 相片簿 -->
        <div class="col-12 col-md-8">
          <container class="flex flex-center">
            <div class="row fit wrap items-start">
              <div class="col-6 col-md-4 col-lg-4 col-xl-3 q-pa-sm" v-for="(photo, index) in photos" :key="photo.file" :value="photo">
                <q-btn @click="photoOpen(photo)">
                  <q-card class="my-pet-card">
                    <img :src="photo.src" />
                    <div class="absolute-bottom-right"></div>
                  </q-card>
                </q-btn>
                <div class="q-pa-md" style="max-width: 300px">
                  <q-input v-if="photo.edit" v-model="photo.model" filled type="textarea" />
                </div>
                <!-- 照片增改刪查 -->
                <div v-if="editMenu" style="cursor:pointer">
                  <q-icon v-if="!photo.edit" name="create" color="primary" size="2rem" @click="edit(photo)"></q-icon>
                  <q-icon v-if="!photo.edit" name="delete_forever" color="negative" size="2rem" @click="del(photo, index)"></q-icon>
                  <q-icon v-if="photo.edit" name="save" color="secondary" size="2rem" @click="save(photo)"></q-icon>
                  <q-icon v-if="photo.edit" name="cancel" color="accent" size="2rem" @click="cancel(photo)"></q-icon>
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
            <q-form @submit="onSubmit_upload" @reset="onReset_upload" style="width:80%">
              <!-- 檔案上傳 -->
              <q-file v-model="photoFile" filled bottom-slots counter label="選擇檔案" color="secondary" style="margin-bottom:1rem">
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
              <q-input v-model="textarea" filled clearable type="textarea" color="secondary" label="說明文字" hint="*說明限50字內" />
              <div class="login-btn flex flex-center">
                <q-btn rounded label="上傳" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px" />
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px" />
              </div>
            </q-form>
          </div>
          <q-icon name="cancel" size="40px" color="white" class="absolute UPcancel" @click="uploadphoto = false"></q-icon>
        </q-card>
      </q-dialog>
      <!-- 點擊圖片彈出拍立得視窗 -->
      <q-dialog v-model="photoOpenn">
        <q-card class="column pet_card">
          <q-card-section class="row justify-end q-pb-none">
            <q-btn icon="close" round dense v-close-popup color="primary" />
          </q-card-section>
          <q-card-section class="photoBox">
            <img :src="photoopen.src" class="photo" />
          </q-card-section>
          <q-card-section>
            <div>
              <q-chip color="primary" text-color="white">
                {{ photoopen.animal }}
              </q-chip>
              <q-chip color="accent" text-color="white">
                {{ photoopen.breed }}
              </q-chip>
            </div>
          </q-card-section>
          <q-card-section style="margin:0 0 1rem 0.5rem">
            <div>
              {{ photoopen.description }}
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  name: 'Mypage',
  data() {
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
      uploadSuccess: false,
      photoopen: [],
      photoOpenn: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    selectedBreed() {
      return this.animalSelected.breeds
    },
    selectedBodypart() {
      return this.animalSelected.bodypart
    }
  },
  methods: {
    onSubmit_upload() {
      if (this.photoFile.size > 1024 * 1024) {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '圖片太大',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else if (!this.photoFile.type.includes('image')) {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '圖片格式錯誤',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else if (this.photoFile === '') {
        this.$swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '圖片欄位不得空白',
          confirmButtonColor: '#C2B593',
          iconColor: '#8d2430'
        })
      } else {
        const photo = new FormData()
        photo.append('image', this.photoFile)
        photo.append('animal', this.animalSelected._id)
        photo.append('breed', this.breedSelected._id)
        photo.append('bodypart', this.bodySelected._id)
        photo.append('description', this.textarea)

        this.axios.post(process.env.VUE_APP_API + '/photos/', photo).then(res => {
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
            this.$swal.fire({
              icon: 'success',
              title: '上傳成功',
              confirmButtonColor: '#C2B593',
              iconColor: '#56C6BF'
            })
            this.uploadphoto = false
            // 清空
            this.photoFile = null
            this.animalSelected = ''
            this.breedSelected = ''
            this.bodySelected = ''
            this.textarea = ''
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430'
            })
          }
        })
      }
    },
    onReset_upload() {
      this.photoFile = null
      this.animalSelected = ''
      this.breedSelected = ''
      this.bodySelected = ''
      this.textarea = ''
    },
    cancel(photo) {
      photo.edit = false
      photo.model = photo.des
    },
    save(photo) {
      this.axios
        .patch(process.env.VUE_APP_API + '/photos/' + photo._id, { description: photo.model })
        .then(res => {
          if (res.data.success) {
            photo.edit = false
            photo.des = photo.model
            this.$swal.fire({
              icon: 'success',
              title: '更新成功',
              confirmButtonColor: '#C2B593',
              iconColor: '#56C6BF'
            })
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '儲存失敗',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430',
              border: 'none'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit(photo) {
      photo.edit = true
      photo.model = photo.des
    },
    del(photo, index) {
      this.axios
        .delete(process.env.VUE_APP_API + '/photos/' + photo._id)
        .then(res => {
          if (res.data.success) {
            this.photos.splice(index, 1)
            this.$swal.fire({
              icon: 'success',
              title: '刪除成功',
              confirmButtonColor: '#C2B593',
              iconColor: '#56C6BF'
            })
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '刪除失敗',
              confirmButtonColor: '#C2B593',
              iconColor: '#8d2430',
              border: 'none'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    photoOpen(photo) {
      this.photoOpenn = true
      this.photoopen = photo
    }
  },
  // 抓全部的動物資料
  async mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/animals/')
      .then(res => {
        if (res.data.success) {
          this.animals = res.data.result
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 抓使用者的圖片資料
    await this.axios
      .get(process.env.VUE_APP_API + '/photos/user/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.photos = res.data.result.map(photo => {
            photo.src = process.env.VUE_APP_API + '/photos/file/' + photo.file
            photo.des = photo.description
            photo.model = photo.description
            photo.breed = photo.breeds
            photo.bodypart = photo.bodyparts
            photo.edit = false
            delete photo.breeds
            delete photo.bodyparts
            return photo
          })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '錯誤',
            confirmButtonColor: '#C2B593',
            iconColor: '#8d2430'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 抓動物品種、類型、部位的name出來
    await this.photos.map(item => {
      this.axios
        .get(process.env.VUE_APP_API + '/photos/breeds/' + item._id)
        .then(res => {
          item.breed = res.data.breed.name
        })
        .catch(err => {
          console.log(err)
        })
      this.axios
        .get(process.env.VUE_APP_API + '/photos/bodyparts/' + item._id)
        .then(res => {
          item.bodypart = res.data.body.name
        })
        .catch(err => {
          console.log(err)
        })
      this.axios
        .get(process.env.VUE_APP_API + '/photos/animals/' + item._id)
        .then(res => {
          item.animal = res.data.animal
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
</script>
