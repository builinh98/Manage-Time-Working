<template>
  <v-row align="center" justify="center">
    {{ 'Profile' }}
  </v-row>
</template>

<script>
export default {
  middleware: 'notAuthenticated'
}
</script>
