<template>
  <v-app-bar app clipped-left color="blue">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <span class="title ml-3 mr-5">
      Time&nbsp;
      <span class="font-weight-light">Working</span>
    </span>
    <v-spacer />
    <v-avatar size="30">
      <!-- <v-icon size="60">mdi-account-circle</v-icon> -->
      <v-icon size="30" @click="logout">mdi-account-switch</v-icon>
    </v-avatar>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {
  drawer: boolean = false

  async logout() {
    try {
     this.$toast.show('Logout ...', { duration: 1000 })
     await this.$auth.logout()
    } catch (err) {
      console.log(err.message)
    }
  }
}
</script>