<template>
  <v-row align="center" justify="center">
    {{ 'Log action' }}
  </v-row>
</template>

<script>
export default {
  middleware: 'notAuthenticated'
}
</script>
