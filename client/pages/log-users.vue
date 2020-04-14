<template>
  <v-row align="center" justify="center">
    {{ 'Log users' }}
  </v-row>
</template>

<script>
export default {
  middleware: 'notAuthenticated'
}
</script>
