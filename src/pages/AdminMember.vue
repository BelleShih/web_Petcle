<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table :grid="$q.screen.xs" :data="users" :columns="titles" row-key="name" :rows-per-page-option="[10, 15, 20]" :filter="filter">
        <template v-slot:body="user">
          <q-tr :props="user">
            <q-td key="name">
              <q-input outlined filled v-if="user.row.edit" v-model="user.row.modelName" />
              <q-btn v-else>{{ user.row.name }}</q-btn>
            </q-td>

            <q-td key="account">
              <q-input outlined filled v-if="user.row.edit" v-model="user.row.modelAccount" />
              <p v-else>{{ user.row.account }}</p>
            </q-td>

            <q-td key="email">
              <q-input outlined filled type="textarea" v-if="user.row.edit" v-model="user.row.modelEmail" />
              <p v-else>{{ user.row.email }}</p>
            </q-td>
            <q-td key="pet">
              <div v-if="user.row.edit">
                <q-radio v-model="modelPet" val="true" label="是" />
                <q-radio v-model="modelPet" val="false" label="否" />
              </div>
              <p v-else>{{ user.row.pet }}</p>
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn v-if="!user.row.edit" round icon="edit" color="primary" size="0.7rem" @click="edit(user)" class="mr-1" />
              <q-btn v-if="!user.row.edit" round icon="delete_forever" color="negative" size="0.7rem" @click="del(user, index)" />
              <q-btn v-if="user.row.edit" round icon="save" color="secondary" size="0.7rem" @click="save(user)" class="mr-1" />
              <q-btn v-if="user.row.edit" round icon="cancel" color="accent" size="0.7rem" @click="cancel(user)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <h6 class="adminTitle">用戶管理</h6>
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
      users: [],
      modelAccount: '',
      modelName: '',
      modelEmail: '',
      modelPet: 'false',
      // 表格標題
      titles: [
        {
          name: 'account',
          required: true,
          label: '帳號',
          align: 'left',
          field: 'account',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: '使用者名稱',
          field: 'name',
          sortable: true
        },
        {
          name: 'email',
          align: 'left',
          label: 'E-mail',
          field: 'email',
          sortable: true
        },
        {
          name: 'pet',
          align: 'left',
          label: '寵物',
          field: 'pet',
          sortable: true
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
    edit(user) {
      user.row.edit = true
      user.row.modelName = user.row.name
      user.row.modelAccount = user.row.account
      user.row.modelEmail = user.row.email
      this.modelPet = user.row.pet
    },
    save(user) {
      this.axios
        .patch(process.env.VUE_APP_API + '/users/' + user.row._id, {
          name: user.row.modelName,
          account: user.row.modelAccount,
          email: user.row.modelEmail,
          pet: this.modelPet
        })
        .then(res => {
          if (res.data.success) {
            user.row.edit = false
            user.row.name = user.row.modelName
            user.row.account = user.row.modelAccount
            user.row.email = user.row.modelEmail
            user.row.pet = this.modelPet

            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del(user) {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/' + user.row._id)
        .then(res => {
          if (res.data.success) {
            this.users.splice(user.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel(user) {
      user.row.edit = false
      user.row.modelName = user.row.name
      user.row.modelAccount = user.row.account
      user.row.modelEmail = user.row.email
      this.modelPet = user.row.pet
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          this.users = res.data.result.map(user => {
            user.modelName = user.name
            user.modeAccount = user.account
            user.modelEmail = user.email
            user.edit = false
            return user
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
