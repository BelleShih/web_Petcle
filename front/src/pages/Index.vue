<template>
  <q-layout-container class="flex flex-center">
    <div class="row fit wrap justify-center items-start" >
      <div class="col-6 col-md-4 col-lg-3 q-pa-sm" v-for="n in 5" :key="`xs-${n}`">
        <q-card class="my-card" style="heigh:30px">
          <img src="~assets/01.jpg">
          <div class="absolute-bottom-right">
            <q-btn flat round color="primary" icon="star" />
          </div>
        </q-card>
          <q-btn flat round color="red" icon="favorite" />
      </div>
    </div>
  </q-layout-container>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
