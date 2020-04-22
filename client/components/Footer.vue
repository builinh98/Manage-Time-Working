<template>
  <v-footer :fixed="false" app>
    <span>&copy; {{ new Date().getFullYear() + ' Zinza Technology' }}</span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
  fixed: boolean = false
}
</script>

<style lang="scss" scoped>
.v-card__title {
  font-size: 100%;
  a {
    margin-right: 9px;
  }
}
.icons svg {
  font-size: 1.1em;
}
</style>