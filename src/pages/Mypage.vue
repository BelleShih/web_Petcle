<template>
  <q-page>
    <q-layout-container>
      <div class="flex row flex-center" style="padding-top:100px">
        <div class="col-12 col-md-3 flex column flex-center" style="border-right:1px solid #333">
          <div class="flex column flex-center">
            <img src="https://picsum.photos/200/200/?random=1">
            <h5>{{ user.name }}</h5>
            <p>@{{ user.id }}</p>
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
                <q-file v-model="photoFile" filled bottom-slots label="選擇檔案" counter style="margin-bottom:1rem">
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
                  <select class="col-12 col-lg-6 UPanimaltype" v-model="animalSelected" placeholder="選擇動物類型">
                    <option value="" disabled selected>選擇你的動物種類</option>
                    <option v-for="animal in animals" :key="animal.label" :value="animal">{{ animal.label }}</option>
                  </select>
                  <select class="col-12 col-lg-6 UPanimaltype" v-model="breedSelected" placeholder="選擇你的動物品種">
                    <option value="" disabled selected>選擇你的動物品種</option>
                    <option v-for="breed in selectedBreed" :key="breed.label" :value="breed">{{ breed.label }}</option>
                  </select>
                </div>
                <!-- 部位 -->
                <q-select class="col-12 col-lg-6" clearable filled color="secondary" v-model="model" :options="options" label="其他特徵" style="margin-bottom:1rem"/>
                <!-- 照片說明 -->
                <q-input
                  v-model="textarea"
                  filled
                  clearable
                  type="textarea"
                  color="secondary"
                  label="說明文字"
                  hint="*說明限50字內"
                  :shadow-text="textareaShadowText"
                />
              <div class="login-btn flex flex-center">
                <q-btn rounded label="上傳" type="submit" color="secondary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
          <q-icon name="cancel" size="40px" class="absolute UPcancel" @click="uploadphoto = false"></q-icon>
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
      animalSelected: [],
      breedSelected: '',
      textarea: '',
      animal: '',
      animals: [
        {
          label: '狗狗',
          value: 0,
          breed: [
            {
              label: '黃金獵犬',
              value: '0'
            },
            {
              label: '哈士奇',
              value: '1'
            },
            {
              label: '柯基',
              value: '2'
            },
            {
              label: '柴犬',
              value: '3'
            },
            {
              label: '貴賓犬',
              value: '4'
            },
            {
              label: '薩摩耶',
              value: '5'
            },
            {
              label: '博美',
              value: '6'
            },
            {
              label: '雪納瑞',
              value: '7'
            },
            {
              label: '西施犬',
              value: '8'
            },
            {
              label: '牧羊犬',
              value: '9'
            },
            {
              label: '吉娃娃',
              value: '10'
            },
            {
              label: '米克斯',
              value: '11'
            },
            {
              label: '拉不拉多',
              value: '12'
            }
          ]
        },
        {
          label: '貓貓',
          value: 1,
          breed: [
            {
              label: '短毛貓',
              value: '0'
            },
            {
              label: '橘貓',
              value: '0'
            }
          ]
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    selectedBreed () {
      if (this.animalSelected === '') return []
      return this.animalSelected.breed
    }
    // animalfunc () {
    //   return this.animals
    // }
    // animaltypefunc () {
    //   return this.animals[this.FormAnimal.index].animaltype
    // }
  }
}
</script>
