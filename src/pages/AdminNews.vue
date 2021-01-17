<template>
  <q-table
    :grid="$q.screen.xs"
    :data="data"
    :columns="columns"
    row-key="name"
    :filter="filter"
    hide-header
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="請輸入關鍵字">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div>
          <q-badge color="purple" :label="props.value" />
        </div>
        <div class="my-table-details">
          {{ props.row.details }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'type',
          required: true,
          label: '分類',
          align: 'left',
          field: 'type',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'title', align: 'center', label: '主題', field: 'title', sortable: true },
        { name: 'description', label: '內容', field: 'description', sortable: true },
        { name: 'time', label: '發佈時間', field: 'time' }
      ],
      data: [
        {
          title: '標題1',
          description: '內容1',
          type: '新聞',
          time: 2021,
          photo: 2222
        },
        {
          title: '標題2',
          description: '內容2',
          type: 1,
          time: 2021,
          photo: 2222
        },
        {
          title: '標題3',
          description: '內容3',
          type: 1,
          time: 2021,
          photo: 2222
        }
      ]
    }
  }
}
</script>
