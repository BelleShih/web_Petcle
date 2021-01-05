<template>
  <q-page>
    <q-layout-container>
      <div class="flex row flex-center" style="padding-top:100px">
        <div class="col-12 col-md-3 flex column ">
          <div>
            <img src="https://picsum.photos/100/100/?random=1">
          </div>
          <h6>{{ user.name }}</h6>
          <p>{{ user.id }}</p>
        </div>
        <div class="col-12 col-md-8"></div>
      </div>
    </q-layout-container>
  </q-page>
</template>

<script>
export default {
  name: 'Mypage',
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
