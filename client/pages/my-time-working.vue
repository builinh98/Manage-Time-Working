<template>
  <v-row align="center" justify="center">
    {{ 'My time Working' }}
  </v-row>
</template>

<script>
export default {
  middleware: 'notAuthenticated'
}
</script>
