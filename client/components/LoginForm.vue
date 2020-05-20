<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :counter="50"
          label="Username"
          prepend-icon="person"
          required
          ref="username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          prepend-icon="lock"
          required
        ></v-text-field>

        <v-checkbox v-model="checkbox" label="Re member me?" required></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { userModule } from '@/store';

@Component
export default class LoginForm extends Vue {
  valid: boolean = true
  checkbox: boolean = false
  username: string = 'linhbq.intern@gmail.com'
  password: string = '2321998'
  // usernameRules: Array = ''
  // passwordRules: Array = ''
  created() {
    userModule.setUserInfo('linhbq.intern@gmail.com')
  }

  async login() {
    try {
      this.$toast.show('Logging in...', { duration: 1000 })
      const response: any = await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
      const token = response.data.user.token
      const user = response.data.user
      this.$auth.setToken('local', token)
      this.$auth.setUser(user)
    } catch (err) {
      console.log(err.message)
    }
  }
}
</script>