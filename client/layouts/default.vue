<template>
  <v-app>
    <v-app-bar app clipped-left color="blue">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5"
        >Time&nbsp;<span class="font-weight-light">Working</span></span
      >
      <!-- <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      /> -->

      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <v-card class="mx-auto" max-width="434" tile>
          <v-row align="end" class="fill-height">
            <v-col cols="1"></v-col>
            <v-col cols="3">
              <v-avatar>
                <v-icon size="90">mdi-account-circle</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="7">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Bùi Quang Linh</v-list-item-title>
                  <v-list-item-subtitle>Intern</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
        <v-divider dark class="my-4" />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <Nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() + ' Zinza Technology' }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    fixed: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Dashboard',
        to: '/'
      },
      { icon: 'mdi-account-box', title: 'Profile', to: '/profile' },
      {
        icon: 'mdi-clock',
        title: 'My Time Working',
        name: 'myTimeWorking',
        to: '/my-time-working'
      },
      {
        icon: 'mdi-calendar-question',
        title: 'Leave Request',
        to: '/leave-request'
      },
      { icon: 'mdi-format-list-bulleted', title: 'Users', to: '/users' },
      { icon: 'mdi-calendar-clock', title: 'Log Of Users', to: '/log-users' },
      {
        icon: 'mdi-memory',
        title: 'Log Action Detail',
        to: '/log-action'
      }
    ]
  })
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
