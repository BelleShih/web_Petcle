<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table
        :grid="$q.screen.xs"
        :data="discuss"
        :columns="titles"
        row-key="name"
        :rows-per-page-option="[5, 7, 10]"
        :filter="filter"
      >
        <template v-slot:body="discuss">
          <q-tr :props="discuss">
            <q-td key="questiontype">
              <q-input
                outlined
                filled
                v-if="discuss.row.edit"
                v-model="discuss.row.modelType"
              />
              <p v-else>{{ discuss.row.questiontype }}</p>
            </q-td>

            <q-td key="title">
              <q-input
                outlined
                filled
                v-if="discuss.row.edit"
                v-model="discuss.row.modelTitle"
              />
              <p v-else>{{ discuss.row.title }}</p>
            </q-td>

            <q-td key="description">
              <q-input
                outlined
                filled
                type="textarea"
                v-if="discuss.row.edit"
                v-model="discuss.row.modelDescription"
              />
              <p v-else>{{ discuss.row.description }}</p>
            </q-td>
            <q-td key="date">
              {{ new Date(discuss.row.date).toLocaleString() }}
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn v-if="!discuss.row.edit" round icon="edit" color="primary" size="0.7rem" @click="edit(discuss)" class="mr-1"/>
              <q-btn v-if="!discuss.row.edit" round icon="delete_forever" color="negative" size="0.7rem" @click="del(discuss, index)"/>
              <q-btn v-if="discuss.row.edit" round icon="save" color="secondary" size="0.7rem" @click="save(discuss)" class="mr-1"/>
              <q-btn v-if="discuss.row.edit" round icon="cancel" color="accent" size="0.7rem"  @click="cancel(discuss)"/>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <h6>留言管理</h6>
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
      discuss: [],
      modelTitle: '',
      modelDescription: '',
      modelType: '',
      // 表格標題
      titles: [
        {
          name: 'questiontype',
          required: true,
          label: '類型',
          align: 'left',
          field: 'questiontype',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'title',
          align: 'left',
          label: '主旨',
          field: 'title',
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: '內文',
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
      ]
    }
  },
  methods: {
    edit (discuss) {
      discuss.row.edit = true

      discuss.row.modelType = discuss.row.type
      discuss.row.modelTitle = discuss.row.title
      discuss.row.modelDescription = discuss.row.description
    },
    save (discuss) {
      this.axios.patch(process.env.VUE_APP_API + '/discuss/' + discuss.row._id, {
        title: discuss.row.modelTitle,
        description: discuss.row.modelDescription,
        questiontype: discuss.row.modelType
      })
        .then(res => {
          if (res.data.success) {
            discuss.row.edit = false
            discuss.row.title = discuss.row.modelTitle
            discuss.row.description = discuss.row.modelDescription
            discuss.row.type = discuss.row.modelType

            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del (discuss) {
      this.axios.delete(process.env.VUE_APP_API + '/discuss/' + discuss.row._id)
        .then(res => {
          if (res.data.success) {
            this.discuss.splice(discuss.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel (discuss) {
      discuss.row.edit = false
      discuss.row.model = discuss.row.description
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/discuss/')
      .then(res => {
        if (res.data.success) {
          this.discuss = res.data.result.map(discuss => {
            discuss.modelT = discuss.title
            discuss.modelD = discuss.description
            discuss.edit = false
            return discuss
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
