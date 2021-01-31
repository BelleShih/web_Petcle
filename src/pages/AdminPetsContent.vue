<template>
  <q-page style="padding:1rem" id="admin_new">
    <q-layout-container>
      <q-table :grid="$q.screen.xs" :data="pets" :columns="titles" row-key="name" :rows-per-page-option="[10, 15, 20]" :filter="filter">
        <template v-slot:body="pet">
          <q-tr :props="pet">
            <q-td key="file">
              <img :src="pet.row.src" style="height:60px" />
            </q-td>

            <q-td key="name">
              <q-input outlined filled v-if="pet.row.edit" v-model="pet.row.modelName" />
              <p v-else>{{ pet.row.name }}</p>
            </q-td>

            <q-td key="animal">
              <q-input outlined filled v-if="pet.row.edit" v-model="pet.row.modelAnimal" />
              <p v-else>{{ pet.row.animal }}</p>
            </q-td>

            <q-td key="breed">
              <q-input outlined filled type="textarea" v-if="pet.row.edit" v-model="pet.row.modelBreed" />
              <p v-else>{{ pet.row.breed }}</p>
            </q-td>

            <q-td key="description">
              <q-input outlined filled type="textarea" v-if="pet.row.edit" v-model="pet.row.modelDes" />
              <p v-else>{{ pet.row.description }}</p>
            </q-td>

            <q-td key="mails">
              <q-btn flat icon="mail_outline" color="primary"></q-btn>
            </q-td>

            <q-td key="sendMails">
              <q-btn flat icon="forward_to_inbox" color="secondary"></q-btn>
            </q-td>

            <q-td key="actions">
              <!-- 增改刪查按鈕區 -->
              <q-btn v-if="!pet.row.edit" round icon="edit" color="primary" size="0.7rem" @click="edit(pet)" class="mr-1" />
              <q-btn v-if="!pet.row.edit" round icon="delete_forever" color="negative" size="0.7rem" @click="del(pet, index)" />
              <q-btn v-if="pet.row.edit" round icon="save" color="secondary" size="0.7rem" @click="save(pet)" class="mr-1" />
              <q-btn v-if="pet.row.edit" round icon="cancel" color="accent" size="0.7rem" @click="cancel(pet)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <h6 class="adminTitle">寵物管理</h6>
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
      pets: [],
      pet: [],
      modelName: '',
      modelAnimal: '',
      modelBreed: '',
      modelBody: '',
      modelDes: '',
      // 表格標題
      titles: [
        {
          name: 'file',
          required: true,
          label: '大頭照',
          align: 'left',
          field: 'file',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: '名字',
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'animal',
          align: 'left',
          label: '種類',
          field: 'animal',
          sortable: true
        },
        {
          name: 'breed',
          align: 'left',
          label: '品種',
          field: 'breed',
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: '關於我',
          field: 'description',
          sortable: true
        },
        {
          name: 'mails',
          align: 'left',
          label: '收信',
          field: 'mails',
          sortable: true
        },
        {
          name: 'sendMails',
          align: 'left',
          label: '寄信',
          field: 'sendMails',
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
    edit(pet) {
      pet.row.edit = true
      pet.row.modelName = pet.row.name
      pet.row.modelAnimal = pet.row.animal
      pet.row.modelBreed = pet.row.breed
      pet.row.modelDes = pet.row.description
    },
    save(pet) {
      this.axios
        .patch(process.env.VUE_APP_API + '/pets/' + pet.row._id, {
          name: pet.row.modelName,
          animal: pet.row.modelAnimal,
          breed: pet.row.modelBreed,
          description: pet.row.modelDes
        })
        .then(res => {
          if (res.data.success) {
            pet.row.edit = false
            pet.name = pet.row.modelName
            pet.animal = pet.row.modeAnimal
            pet.breed = pet.row.modelBreed
            pet.description = pet.row.modelDes
            alert('保存成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del(pet) {
      this.axios
        .delete(process.env.VUE_APP_API + '/pets/' + pet.row._id)
        .then(res => {
          if (res.data.success) {
            this.pets.splice(pet.rowIndex, 1)
            alert('刪除成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel(pet) {
      pet.row.edit = false
      pet.modelName = pet.name
      pet.modeAnimal = pet.animal
      pet.modelBreed = pet.breed
      pet.modelDes = pet.description
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/pets/' + this.$route.params.id)
      .then(res => {
        console.log(res)
        if (res.data.success) {
          this.pets = [res.data.result].map(pet => {
            pet.src = process.env.VUE_APP_API + '/pets/file/' + pet.file
            pet.modelName = pet.name
            pet.modeAnimal = pet.animal
            pet.modelBreed = pet.breed
            pet.modelDes = pet.description
            pet.edit = false
            return pet
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
