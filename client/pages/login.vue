<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-toolbar color="primary" flat>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :counter="50"
              :rules="emailRules"
              label="Email"
              prepend-icon="person"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              type="password"
              :rules="passwordRules"
              label="Password"
              prepend-icon="lock"
              required
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
              label="Re member me?"
              required
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

// eslint-disable-next-line no-unused-vars
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      (v) => !!v || 'Username is required',
      (v) => /.+@.+\..+/.test(v) || 'Username must be valid'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    checkbox: false
  }),
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async submit() {
      const login = { username: this.email, password: this.password }
      if (this.valid) {
        try {
          const response = await this.$auth.loginWith('local', {
            data: login
          })
          console.log('hggyg', response)
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('fsdfs')
      }
    }
  }
}
</script>
