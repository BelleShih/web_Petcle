<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table :grid="$q.screen.xs" :data="contacts" :columns="titles" row-key="name" :rows-per-page-option="[5, 7, 10]" :filter="filter">
        <template v-slot:body="contact">
          <q-tr :props="contact">
            <q-td key="sender">
              <p>{{ contact.row.sender }}</p>
            </q-td>

            <q-td key="mail">
              <p>{{ contact.row.mail }}</p>
            </q-td>

            <q-td key="title">
              <p>{{ contact.row.title }}</p>
            </q-td>

            <q-td key="description">
              <p>{{ contact.row.description }}</p>
            </q-td>
            <q-td key="date">
              {{ new Date(contact.row.date).toLocaleString() }}
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn round icon="delete_forever" color="negative" size="0.7rem" @click="del(contact, index)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <h6 class="adminTitle">聯絡我們-信件管理</h6>
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
  data() {
    return {
      filter: '',
      contacts: [],
      // 表格標題
      titles: [
        {
          name: 'sender',
          required: true,
          label: '寄件人',
          align: 'left',
          field: 'sender',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'mail',
          align: 'left',
          label: '電子信箱',
          field: 'mail',
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
          label: '想說的話',
          field: 'description',
          sortable: true
        },
        {
          name: 'date',
          align: 'left',
          label: '寄送時間',
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
    del(contact) {
      this.axios
        .delete(process.env.VUE_APP_API + '/contacts/' + contact.row._id)
        .then(res => {
          if (res.data.success) {
            this.contacts.splice(contact.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/contacts/')
      .then(res => {
        if (res.data.success) {
          this.contacts = res.data.result.map(contact => {
            return contact
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
