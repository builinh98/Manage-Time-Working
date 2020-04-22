<template>
  <v-breadcrumbs :items="items" large></v-breadcrumbs>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Breadcumd extends Vue {
  items: Array<Object> = [
    {
      text: 'Dashboard',
      disabled: false,
      href: 'index'
    }
  ]
}
</script>