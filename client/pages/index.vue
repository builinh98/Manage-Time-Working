<template>
  <v-layout column justify-center align-center>
    <!-- <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <div>
            <h2>Todos</h2>
            <ul>
              <li v-for="(todo, index) in todos" :key="index">
                <input
                  :checked="todo.done"
                  type="checkbox"
                  @change="toggle(todo)"
                />
                <span :class="{ done: todo.done }">
                  {{ todo.text }}
                </span>
              </li>
              <li>
                <input
                  placeholder="What needs to be done?"
                  @keyup.enter="addTodo"
                />
              </li>
            </ul>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/logout">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex> -->
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: mapGetters({
    todos: 'users/users'
  }),
  methods: {
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.commit('todos/add', { text })
      }
      e.target.value = ''
    }
  }
}
</script>
