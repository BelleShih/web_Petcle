<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table :data="news" :columns="titles" row-key="name" :rows-per-page-option="[5, 7, 10]" :filter="filter">
        <template v-slot:body="newss">
          <q-tr :props="newss" >
            <q-td key="type">
              <q-input outlined filled v-if="newss.row.edit" v-model="newss.row.modelType" />
              <p v-else>{{ newss.row.type }}</p>
            </q-td>

            <q-td key="title">
              <q-input outlined filled v-if="newss.row.edit" v-model="newss.row.modelTitle" />
              <p v-else>{{ newss.row.title }}</p>
            </q-td>

            <q-td key="description">
              <q-input outlined filled type="textarea" v-if="newss.row.edit" v-model="newss.row.modelDescription" />
              <p v-else>{{ newss.row.description }}</p>
            </q-td>
            <q-td key="date">
              {{ new Date(newss.row.date).toLocaleString() }}
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn v-if="!newss.row.edit" round icon="edit" color="primary" size="0.7rem" @click="edit(newss)" class="mr-1" />
              <q-btn v-if="!newss.row.edit" round icon="delete_forever" color="negative" size="0.7rem" @click="del(newss)" />
              <q-btn v-if="newss.row.edit" round icon="save" color="secondary" size="0.7rem" @click="save(newss)" class="mr-1" />
              <q-btn v-if="newss.row.edit" round icon="cancel" color="accent" size="0.7rem" @click="cancel(newss)" />
            </q-td>
          </q-tr>
        </template>
        <!-- 增加消息 -->
        <template v-slot:top-left>
          <h6 class="adminTitle" style="width:85px">最新消息</h6>
          <q-btn icon="add" color="primary" @click="uploadNew = true">新增消息</q-btn>
        </template>
        <!-- 搜尋框 -->
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="請輸入關鍵字">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-layout-container>
    <!-- 新增消息＿彈出視窗 -->
    <q-dialog v-model="uploadNew">
      <q-card id="adminnew_dialog" class="flex row">
        <div class="col-12 flex flex-center bg-grey-8" style="height:15%">
          <p class="upload_title">新增消息</p>
        </div>
        <div class="col-12 flex flex-center cloumn" style="height:80%">
          <q-form @submit="addNew" @reset="restNew" style="width:80%">
            <!-- 檔案上傳 -->
            <q-file v-model="newFile" filled bottom-slots counter label="選擇檔案" style="margin-bottom:1rem">
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
            <!-- 標題 -->
            <div class="flex row justify-between" style="margin-bottom:1rem">
              <q-input class="col-12" filled v-model="modelTitle" label="標題" />
            </div>
            <!-- 分類 -->
            <select class="col-12 ULanimaltype_bp" v-model="modelType" placeholder="請選擇分類">
              <option value="" disabled selected>請選擇分類</option>
              <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
            </select>
            <!-- 活動說明 -->
            <q-input v-model="modelDescription" filled clearable type="textarea" label="活動說明文字" />
            <div class="login-btn flex flex-center">
              <q-btn rounded label="上傳" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px" />
              <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px" />
            </div>
          </q-form>
        </div>
        <q-icon name="cancel" size="40px" color="white" class="absolute" @click="uploadNew = false"></q-icon>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      news: [],
      newFile: null,
      modelTitle: '',
      modelDescription: '',
      modelType: '',
      // 表格標題
      titles: [
        {
          name: 'type',
          required: true,
          label: '分類',
          align: 'left',
          field: 'type',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'title',
          align: 'left',
          label: '主題',
          field: 'title',
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: '活動說明',
          field: 'description',
          sortable: true
        },
        {
          name: 'date',
          align: 'left',
          label: '發佈時間',
          field: 'date'
        },
        {
          name: 'actions',
          label: '編輯',
          align: 'left'
        }
        // { name: 'time', align: 'left', label: '操作', field: 'date' }
      ],
      uploadNew: false,
      types: ['新聞快訊', '活動消息', '展覽資訊', '愛心領養', '走失情報', '流浪動物']
    }
  },
  methods: {
    edit (newss) {
      newss.row.edit = true

      newss.row.modelType = newss.row.type
      newss.row.modelTitle = newss.row.title
      newss.row.modelDescription = newss.row.description
    },
    save (newss) {
      this.axios
        .patch(process.env.VUE_APP_API + '/news/' + newss.row._id, {
          title: newss.row.modelTitle,
          description: newss.row.modelDescription,
          type: newss.row.modelType
        })
        .then(res => {
          if (res.data.success) {
            newss.row.edit = false
            newss.row.title = newss.row.modelTitle
            newss.row.description = newss.row.modelDescription
            newss.row.type = newss.row.modelType

            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del (newss) {
      this.axios
        .delete(process.env.VUE_APP_API + '/news/' + newss.row._id)
        .then(res => {
          if (res.data.success) {
            this.news.splice(newss.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel (newss) {
      newss.row.edit = false
      newss.row.model = newss.row.description
    },
    // 新增消息
    addNew () {
      if (this.newFile.size > 1024 * 1024) {
        alert('圖片太大')
      } else if (!this.newFile.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const newss = new FormData()
        newss.append('file', this.newFile)
        newss.append('title', this.modelTitle)
        newss.append('description', this.modelDescription)
        newss.append('type', this.modelType)

        this.axios.post(process.env.VUE_APP_API + '/news/', newss).then(res => {
          console.log(res.data)
          if (res.data.success) {
            res.data.result.file = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
            res.data.result.model = res.data.result.description
            res.data.result.edit = false
            this.news.push(res.data.result)

            // 清空
            this.newFile = null
            this.modelTitle = ''
            this.modelDescription = ''
            this.modelType = ''
            this.uploadNew = false
          } else {
            alert('上傳錯誤')
          }
        })
      }
    },
    restNew () {
      this.newFile = null
      this.modelTitle = ''
      this.modelDescription = ''
      this.modelType = ''
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/news/')
      .then(res => {
        if (res.data.success) {
          this.news = res.data.result.map(newss => {
            newss.src = process.env.VUE_APP_API + '/news/' + newss.file
            newss.modelT = newss.title
            newss.modelD = newss.description
            newss.edit = false
            return newss
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
