<template>
  <q-page-container class="flex flex-center">
    <div class="row fit wrap justify-center items-start" >
      <div class="col-6 col-md-4 col-lg-3 q-pa-lg" >
        <q-card class="my-card" style="height:300px; ">
          <img src="~assets/01.jpg">
          <div class="absolute-right" style="top:250px">
            <q-btn flat round color="primary" icon="star" />
          </div>
        </q-card>
          <q-btn flat round color="red" icon="favorite" />
      </div>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
