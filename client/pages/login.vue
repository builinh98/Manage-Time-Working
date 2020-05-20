<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '@/components/LoginForm.vue'

@Component({
  layout: 'console',
  components: {
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
