<template>
  <q-page>
    <q-layout-container style="height:100vh">
      <container class="flex flex-center" style="height:100%;margin-top:2rem">
        <div class="row fit wrap items-start justify-center" >
          <div class="col-10 col-md-4 col-lg-3 q-pa-sm flex" id="pedia">
            <q-card class="pedia-card flex column">
              <div class="flex col-6">
                <img src="https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80">
              </div>
              <div class="flex col-4" style="padding:1rem">
                <p class="text-h6 q-mt-sm q-mb-xs">Title</p>
                <p class="text-caption text-black pedia_des">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div class="flex col-2 justify-end">
                <q-btn flat color="dark" label="繼續閱讀"/>
              </div>
            </q-card>
          </div>
        </div>
      </container>
    </q-layout-container>
  </q-page>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
