<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="6" :circle="true"></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class Profile extends Vue {
  page: number = 1
  // data: Array<Object> = []

  @Watch('page')
  async pageChange() {
    // this.$axios.setToken(
    //   ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg4NTkyODM3LCJleHAiOjE1ODg5NTI4Mzd9.wOipnKndHxv7HHG6Q040i1h-9KBJcY_MxNLOFHmIFlQ',
    //   'Bearer'
    // )
    // const data = await $axios.$get(`checkins?page=${this.page}`)
    // this.data = data
  }

  // public created() {
  //   const UserModuleInstance = getModule(UserModule, this.$store)
  //   console.log('abc',this.$store)
  //   console.log('huy1', UserModuleInstance.getUserInfo())
  //   UserModuleInstance.getUserInfo()
  // }
}
</script>
