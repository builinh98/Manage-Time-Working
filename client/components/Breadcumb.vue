<template>
  <v-breadcrumbs :items="items" large></v-breadcrumbs>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Breadcumd extends Vue {
  @Prop({ required: true }) readonly items!: Array<object>
}
</script>
