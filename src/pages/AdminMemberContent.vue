<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.$route.params.id)
  }
}
</script>
