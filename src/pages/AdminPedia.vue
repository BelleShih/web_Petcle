<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table
        :grid="$q.screen.xs"
        :data="pedias"
        :columns="titles"
        row-key="name"
        :rows-per-page-option="[5, 7, 10]"
        :filter="filter"
      >
        <template v-slot:body="pedia">
          <q-tr :props="pedia">
            <q-td key="type">
              <q-input
                outlined
                filled
                v-if="pedia.row.edit"
                v-model="pedia.row.modelType"
              />
              <p v-else>{{ pedia.row.type }}</p>
            </q-td>

            <q-td key="title">
              <q-input
                outlined
                filled
                v-if="pedia.row.edit"
                v-model="pedia.row.modelTitle"
              />
              <p v-else>{{ pedia.row.title }}</p>
            </q-td>

            <q-td key="description">
              <q-input
                outlined
                filled
                type="textarea"
                v-if="pedia.row.edit"
                v-model="pedia.row.modelDescription"
              />
              <p v-else>{{ pedia.row.description }}</p>
            </q-td>
            <q-td key="date">
              {{ new Date(pedia.row.date).toLocaleString() }}
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-icon v-if="!pedia.row.edit" name="edit" color="primary" size="2rem" @click="edit(pedia)"/>
              <q-icon v-if="!pedia.row.edit" name="delete_forever" color="negative" size="2rem" @click="del(pedia, index)"/>
              <q-icon v-if="pedia.row.edit" name="save" color="secondary" size="2rem" @click="save(pedia)"/>
              <q-icon v-if="pedia.row.edit" name="cancel" color="accent" size="2rem"  @click="cancel(pedia)"/>
            </q-td>
          </q-tr>
        </template>
        <!-- 增加文章 -->
        <template v-slot:top-left>
          <h6>寵物百科</h6>
          <q-btn icon="add" color="primary" @click="uploadPedia = true">新增文章</q-btn>
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
    <q-dialog v-model="uploadPedia">
        <q-card id="adminnew_dialog" class="flex row">
          <div class="col-12 flex flex-center bg-grey-8" style="height:15%">
            <p class="upload_title">新增文章</p>
          </div>
          <div class="col-12 flex flex-center cloumn" style="height:80%">
            <q-form
              @submit="addPedia"
              @reset="restPedia"
              style="width:80%"
            >
              <!-- 檔案上傳 -->
              <q-file v-model="pediaFile" filled bottom-slots counter label="選擇檔案" style="margin-bottom:1rem">
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
                <q-input class="col-12" filled v-model=" modelTitle" label="標題" />
              </div>
              <!-- 分類 -->
              <select class="col-12 ULanimaltype_bp" v-model="modelType" placeholder="請選擇分類">
                <option value="" disabled selected>請選擇分類</option>
                <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
              </select>
              <!-- 活動說明 -->
              <q-input
                v-model="modelDescription"
                filled
                clearable
                type="textarea"
                label="活動說明文字"
              />
              <div class="login-btn flex flex-center">
                <q-btn rounded label="上傳" type="submit" color="primary" size="1.1rem" style="margin-right:1rem;width:80px"/>
                <q-btn rounded label="重置" type="reset" color="accent" size="1.1rem" style="width:80px"/>
              </div>
            </q-form>
          </div>
          <q-icon name="cancel" size="40px" color="white" class="absolute" @click="uploadPedia = false"></q-icon>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      pedias: [],
      pediaFile: null,
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
      uploadPedia: false,
      types: ['健康知識', '寵物飲食', '生活觀察', '美容保養']
    }
  },
  methods: {
    edit (pedia) {
      pedia.row.edit = true

      pedia.row.modelType = pedia.row.type
      pedia.row.modelTitle = pedia.row.title
      pedia.row.modelDescription = pedia.row.description
    },
    save (pedia) {
      this.axios.patch(process.env.VUE_APP_API + '/pedias/' + pedia.row._id, {
        title: pedia.row.modelTitle,
        description: pedia.row.modelDescription,
        type: pedia.row.modelType
      })
        .then(res => {
          if (res.data.success) {
            pedia.row.edit = false
            pedia.row.title = pedia.row.modelTitle
            pedia.row.description = pedia.row.modelDescription
            pedia.row.type = pedia.row.modelType

            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del (pedia) {
      this.axios.delete(process.env.VUE_APP_API + '/pedias/' + pedia.row._id)
        .then(res => {
          if (res.data.success) {
            this.pedias.splice(pedia.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel (pedia) {
      pedia.row.edit = false
      pedia.row.model = pedia.row.description
    },
    // 新增消息
    addPedia () {
      if (this.pediaFile.size > 1024 * 1024) {
        alert('圖片太大')
      } else if (!this.pediaFile.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const pedia = new FormData()
        pedia.append('file', this.pediaFile)
        pedia.append('title', this.modelTitle)
        pedia.append('description', this.modelDescription)
        pedia.append('type', this.modelType)

        this.axios.post(process.env.VUE_APP_API + '/pedias/', pedia)
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
              res.data.result.file = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              res.data.result.model = res.data.result.description
              res.data.result.edit = false
              this.pedias.push(res.data.result)
              // 清空
              this.pediaFile = null
              this.modelTitle = ''
              this.modelDescription = ''
              this.modelType = ''
            } else {
              alert('上傳錯誤')
            }
          })
      }
    },
    restPedia () {
      this.pediaFile = null
      this.modelTitle = ''
      this.modelDescription = ''
      this.modelType = ''
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/pedias/')
      .then(res => {
        if (res.data.success) {
          this.pedias = res.data.result.map(pedia => {
            pedia.src = process.env.VUE_APP_API + '/pedias/' + pedia.file
            pedia.modelT = pedia.title
            pedia.modelD = pedia.description
            pedia.edit = false
            return pedia
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
