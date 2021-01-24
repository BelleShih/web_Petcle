<template>
  <q-page id="petpage" class="container flex-center h-100">
    <!-- 如果使用者寵物欄位有東西就顯示 -->
    <div v-if="pageOpen === true" class="row flex-center h-100 petpage_row">
      <!-- 寵物照片 -->
      <div class="flex-center column col-10 col-lg-6 box h-100 ">
        <img class="col-10" :src="petpage[0].src">
        <q-file v-if="petpage[0].edit" v-model="petFile_Change" filled label="更換寶貝大頭照" class="petFile_Change" style="margin-bottom:1rem">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
        </q-file>
      </div>
      <!-- 右半資料 -->
      <div class="column col-10 col-lg-6 right justify-center">
        <!-- 編輯鈕 -->
        <q-icon v-if="!petpage[0].edit" name="edit" class="edit_icon" size="1.5rem" color="accent" @click="edit(petpage[0])"/>
        <!-- 寵物名字 -->
        <div class="row items-center">
          <div v-if="!petpage[0].edit" class="col-3 name">{{ petpage[0].name }}</div>
          <q-input
            v-if="petpage[0].edit"
            v-model="petpage[0].modelName"
            filled
            type="text"
            class="name_edit"
          />
          <div class="col-3 master">@{{ user.name }}</div>
          <!-- 寄信給他 -->
          <q-btn v-if="!petpage[0].edit" icon="mail" color="primary" size="15px" rounded class="mail_btn"> 寄信給牠</q-btn>
        </div>
        <!-- 寵物自我介紹 -->
        <div>
          <p v-if="!petpage[0].edit" class="pet_des" v-html="html(petpage[0].description)"></p>
          <q-input
            v-if="petpage[0].edit"
            v-model="petpage[0].modelDes"
            filled
            type="textarea"
          />
        </div>
        <!-- 線 -->
        <div class="line"></div>
        <!-- 寵物類型 -->
        <div class="row type">
          <div v-if="!petpage[0].edit" class="animal">{{ petpage[0].animal }}</div>
          <div v-if="!petpage[0].edit" class="breed">{{ petpage[0].breed }}</div>
          <select v-if="petpage[0].edit" class="col-12 col-lg-5 edit_animal" v-model="animalSelected" placeholder="選擇寶貝的動物類型">
            <option value="" disabled selected>選擇寶貝的動物類型</option>
            <option v-for="animal in animals" :key="animal.name" :value="animal">{{ animal.name }}</option>
          </select>
          <select v-if="petpage[0].edit" class="col-12 col-lg-6 edit_breed" v-model="breedSelected" placeholder="選擇寶貝的品種類型">
            <option value="" disabled selected>選擇寶貝的品種類型</option>
            <option v-for="breed in selectedBreed" :key="breed.name" :value="breed">{{ breed.name }}</option>
          </select>
        </div>
        <!-- 修改、刪除、取消 按鈕 -->
        <div class="row justify-center" style="height:30px;margin-top:1rem">
          <q-btn v-if="petpage[0].edit" icon="delete_forever" color="negative" size="0.8rem" @click="del(petpage[0], index)" class="col-3 pet_icon">刪除寶貝</q-btn>
          <q-btn v-if="petpage[0].edit" icon="cancel" color="accent" size="0.8rem"  @click="cancel(petpage[0])" class="col-3 pet_icon">取消修改</q-btn>
          <q-btn v-if="petpage[0].edit" icon="save" color="secondary" size="0.8rem" @click="save(petpage[0])" class="col-3">儲存修改</q-btn>
        </div>
      </div>
    </div>
    <!-- 如果使用者寵物欄位沒東西就顯示上傳畫面 -->
    <div v-else class="row flex-center h-100">
      <div class="flex flex-center nopet_Page">
        <q-btn outline rounded flat icon="arrow_circle_up" color="primary" size="1.2rem" class="uploadPet_btn" @click="uploadPet = true">上傳我的寶貝</q-btn>
      </div>
    </div>
    <!-- 寵物上傳視窗 -->
    <q-dialog v-model="uploadPet">
      <q-card id="uploadPet" class="flex row">
        <div class="col-12 flex flex-center column top">
          <div class="flex justify-end" style="width:100%">
            <q-btn icon="close" flat round dense v-close-popup color="white"/>
          </div>
          <p class="title">上傳我的寶貝</p>
        </div>
        <div class="col-12 flex justify-center cloumn bottom">
          <q-form
              @submit="onSubmit_upload"
              @reset="onReset_upload"
              style="width:80%"
            >
            <!-- 檔案上傳 -->
            <q-file v-model="petFile" filled bottom-slots counter label="上傳寶貝的大頭照" style="margin-bottom:1rem">
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
            <!-- 寵物名字 -->
            <q-input
              v-model="petName"
              filled
              clearable
              type="text"
              color="primary"
              label="寶貝的名字"
            />
            <!-- 選擇哪種動物 & 類型 -->
            <div class="flex row justify-between" style="margin:1rem 0">
              <select class="col-12 col-lg-5 ULanimaltype" v-model="animalSelected" placeholder="選擇寶貝的動物類型">
                <option value="" disabled selected>選擇寶貝的動物種類</option>
                <option v-for="animal in animals" :key="animal.name" :value="animal">{{ animal.name }}</option>
              </select>
              <select class="col-12 col-lg-6 ULanimaltype" v-model="breedSelected" placeholder="選擇寶貝的動物品種">
                <option value="" disabled selected>選擇寶貝的動物品種</option>
                <option v-for="breed in selectedBreed" :key="breed.name" :value="breed">{{ breed.name }}</option>
              </select>
            </div>
            <!-- 照片說明 -->
            <q-input
              v-model="textarea"
              filled
              clearable
              type="textarea"
              color="primary"
              label="寶貝的自我介紹"
            />
            <!-- 按鍵區 -->
            <div class="pet-btn flex flex-center">
              <q-btn rounded label="上傳" type="submit" color="primary" size="1.1rem" style="margin-right:1rem"/>
              <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem"/>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      petpage: [],
      uploadPet: false,
      petFile: '',
      petName: '',
      animalSelected: '',
      breedSelected: '',
      textarea: '',
      animals: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    pageOpen () {
      // 判斷寵物頁面是否顯示出來
      let pageOpen = false
      if (this.petpage.length !== 0) {
        pageOpen = true
      } else {
        pageOpen = false
      }
      return pageOpen
    },
    selectedBreed () {
      return this.animalSelected.breeds
    },
    // 編輯時，儲存後 維持選項的值
    animalSelected_edit () {
      return this.petpage[0].animal
    },
    breedSelected_edit () {
      return this.petpage[0].breed
    }
  },
  methods: {
    onSubmit_upload () {
      if (this.petFile.size > 1024 * 1024) {
        alert('圖片太大')
      } else if (!this.petFile.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const pet = new FormData()
        pet.append('user', this.user.user)
        pet.append('file', this.petFile)
        pet.append('name', this.petName)
        pet.append('animal', this.animalSelected.name)
        pet.append('breed', this.breedSelected.name)
        pet.append('description', this.textarea)

        this.axios.post(process.env.VUE_APP_API + '/pets/', pet)
          .then(res => {
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/pets/file/' + res.data.result.file
              res.data.result.peNname = res.data.result.name
              res.data.result.des = res.data.result.description
              res.data.result.animal01 = res.data.result.animal
              res.data.result.breeds01 = res.data.result.breeds
              res.data.result.edit = false
              this.petpage.push(res.data.result)
              // 清空欄位
              this.petFile = null
              this.petName = ''
              this.animalSelected = ''
              this.breedSelected = ''
              this.textarea = ''
              this.uploadPet = false
            } else {
              alert('上傳失敗')
            }
          })
      }
    },
    onReset_upload () {
      this.petFile = null
      this.petName = ''
      this.animalSelected = ''
      this.breedSelected = ''
      this.textarea = ''
    },
    // 維持文章送出格式
    html (description) {
      return description
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[\w-.]+(:\d+)?(\/[\w/.]*)?(\?\S*)?(#\S*)?)/g, '<a href="$1" target="_blank" >$1</a>')
    },
    edit () {
      this.petpage[0].edit = true
    },
    del () {
      this.axios.delete(process.env.VUE_APP_API + '/pets/' + this.petpage[0]._id)
        .then(res => {
          if (res.data.success) {
            this.petpage.splice(0, 1)
          } else {
            alert('刪除失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel () {
      this.petpage[0].edit = false
      this.petpage[0].modelDes = this.petpage[0].description
      this.petpage[0].modelName = this.petpage[0].name
      this.petpage[0].modelAnimal = this.petpage[0].animal
      this.petpage[0].modelBreed = this.petpage[0].breed
    },
    save () {
      if (this.animalSelected === '' || this.breedSelected === '') {
        alert('請輸入動物種類 或 品種種類')
      } else {
        this.axios.patch(process.env.VUE_APP_API + '/pets/' + this.petpage[0]._id, {
          name: this.petpage[0].modelName,
          description: this.petpage[0].modelDes,
          animal: this.animalSelected.name,
          breed: this.breedSelected.name
        })
          .then(res => {
            if (res.data.success) {
              this.petpage[0].edit = false
              this.petpage[0].name = this.petpage[0].modelName
              this.petpage[0].animal = this.animalSelected.name
              this.petpage[0].breed = this.breedSelected.name
              this.petpage[0].description = this.petpage[0].modelDes
            } else {
              alert('更新失敗')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    // 抓所有動物
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
    // 抓使用者的寵物
    this.axios.get(process.env.VUE_APP_API + '/pets/user/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.petpage = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/pets/file/' + item.file
            item.modelDes = item.description
            item.modelName = item.name
            item.modelAnimal = item.animal
            item.modelBreed = item.breed
            item.edit = false
            return item
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
