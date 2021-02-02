<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table :data="userPhoto" :columns="titles" row-key="name" :rows-per-page-option="[10, 15, 20]" :filter="filter">
        <template v-slot:body="photo">
          <q-tr :props="photo">
            <q-td key="file">
              <img :src="photo.row.src" style="height:100px">
            </q-td>

            <q-td key="description">
              <q-input outlined filled v-if="photo.row.edit" v-model="photo.row.modelDes" />
              <p v-else>{{ photo.row.description }}</p>
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn v-if="!photo.row.edit" round icon="edit" color="primary" size="0.7rem" @click="edit(photo)" class="mr-1" />
              <q-btn v-if="!photo.row.edit" round icon="delete_forever" color="negative" size="0.7rem" @click="del(photo)" />
              <q-btn v-if="photo.row.edit" round icon="save" color="secondary" size="0.7rem" @click="save(photo)" class="mr-1" />
              <q-btn v-if="photo.row.edit" round icon="cancel" color="accent" size="0.7rem" @click="canael(photo)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <h6 class="adminTitle">用戶相片管理</h6>
          <p>{{ user[0].name }} | {{ user[0].account }}</p>
          <q-btn rounded icon="arrow_back" color="primary" style="width:40px" :to="{ name: 'admin.member' }"/>
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
      userPhoto: [],
      modelDes: '',
      allUser: [],
      titles: [
        {
          name: 'file',
          required: true,
          label: '圖片',
          align: 'left',
          field: 'file',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: '描述',
          field: 'description',
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
  computed: {
    user () {
      return this.allUser.filter(item => {
        if (this.$route.params.id === item._id) {
          return item
        }
      })
    }
  },
  methods: {
    edit (photo) {
      photo.row.edit = true
      photo.modelDes = photo.description
    },
    save (photo) {
      this.axios.patch(process.env.VUE_APP_API + '/photos/' + photo.row._id, {
        description: photo.row.modelDes
      })
        .then(res => {
          if (res.data.success) {
            photo.row.edit = false
            photo.row.description = photo.row.modelDes
            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    canael (photo) {
      photo.row.edit = false
      photo.modelDes = photo.description
    },
    del (photo) {
      this.axios.delete(process.env.VUE_APP_API + '/photos/' + photo.row._id)
        .then(res => {
          if (res.data.success) {
            this.userPhoto.splice(photo.rowIndex, 1)
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
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/user/' + this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.userPhoto = res.data.result.map(photo => {
            photo.src = process.env.VUE_APP_API + '/photos/file/' + photo.file
            photo.modelDes = photo.description
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
    // 抓所有使用者
    this.axios.get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        this.allUser = res.data.result.map(item => {
          return item
        })
      })
  }
}
</script>
