<template>
  <v-row align="center" justify="center">
    {{ 'Leave request' }}
  </v-row>
</template>

<script>
export default {
  middleware: 'notAuthenticated'
}
</script>
