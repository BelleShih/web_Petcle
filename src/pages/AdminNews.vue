<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table
        :grid="$q.screen.xs"
        :data="news"
        :columns="titles"
        row-key="name"
        :rows-per-page-option="[5, 7, 10]"
        :filter="filter"
      >
        <template v-slot:body="newss">
          <q-tr :props="newss">
            <q-td key="type">
              <q-input
                outlined
                filled
                v-if="newss.row.edit"
                v-model="newss.row.modelType"
              />
              <p v-else>{{ newss.row.type }}</p>
            </q-td>

            <q-td key="title">
              <q-input
                outlined
                filled
                v-if="newss.row.edit"
                v-model="newss.row.modelTitle"
              />
              <p v-else>{{ newss.row.title }}</p>
            </q-td>

            <q-td key="description">
              <q-input
                outlined
                filled
                v-if="newss.row.edit"
                v-model="newss.row.modelDescription"
              />
              <p v-else>{{ newss.row.description }}</p>
            </q-td>
            <q-td key="date">
              {{ new Date(newss.row.date).toLocaleString() }}
            </q-td>

            <q-td key="actions">
              <!-- <q-btn icon="edit" color="primary" @click="edit(newss)"></q-btn> -->
              <q-icon v-if="!newss.row.edit" name="edit" color="primary" size="2rem" @click="edit(newss)"/>
              <q-icon v-if="!newss.row.edit" name="delete_forever" color="negative" size="2rem" @click="del(newss, index)"/>
              <q-icon v-if="newss.row.edit" name="save" color="secondary" size="2rem" @click="save(newss)"/>
              <q-icon v-if="newss.row.edit" name="cancel" color="accent" size="2rem"  @click="cancel(newss)"/>
            </q-td>
          </q-tr>
        </template>
        <!-- 增加消息 -->
        <template v-slot:top-left>
          <q-btn icon="add" color="primary" @click="addNew()">新增消息</q-btn>
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
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      news: [],
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
      ]
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
      this.axios.patch(process.env.VUE_APP_API + '/news/' + newss.row._id, {
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
      this.axios.delete(process.env.VUE_APP_API + '/news/' + newss.row._id)
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
    addNew () {
      if (this.photoFile.size > 1024 * 1024) {
        alert('圖片太大')
      } else if (!this.photoFile.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const newss = new FormData()
        newss.append('file', this.newFile)
        newss.append('title', this.modelTitle._id)
        newss.append('description', this.modelDescription._id)
        newss.append('typet', this.modelType._id)

        this.axios.post(process.env.VUE_APP_API + '/news/', newss)
          .then(res => {
            if (res.data.success) {
              res.data.result.file = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              res.data.result.title = res.data.result.row.title
              res.data.result.description = res.data.result.row.description
              res.data.result.type = res.data.result.row.type
              res.data.result.edit = false
              this.newss.push(res.data.result)
              // 清空
              this.newFile = null
              this.modelTitle = ''
              this.modelDescription = ''
              this.modelType = ''
            } else {
              alert('上傳錯誤')
            }
          })
      }
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
