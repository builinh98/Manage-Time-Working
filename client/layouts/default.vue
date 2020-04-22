<template>
  <v-app>
    <Navbar />
    <Menubar />
    <v-content>
      <Nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>
<script >
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Menubar from '@/components/Menubar.vue'

export default {
  components: {
    Navbar,
    Footer,
    Menubar
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
