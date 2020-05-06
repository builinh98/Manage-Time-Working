<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb :items="items" />
    </v-row>
    <v-row align="center" justify="center" class="fill-height no-gutters mt-n7">
      <v-col cols="12">
        <v-row class="no-gutters">
          <Toolbar />
        </v-row>
        <v-row>
          <v-col cols="12">
            <Table :headers="headers" :bodys="bodys" />
            <br />
            <Pagination />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Breadcumb from '@/components/Breadcumb.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import Table from '@/components/Table.vue'

@Component({
  components: {
    Breadcumb,
    Toolbar,
    Pagination,
    Table
  }
})
export default class Profile extends Vue {
  items: Array<Object> = [
    {
      text: 'Log Action',
      disabled: false,
      href: 'log-action'
    }
  ]
  // headers: Array<Object> = []
  // bodys: Array<Object> = []

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Amin', value: 'admin' },
    { text: 'Action', value: 'action' },
    { text: 'Timestamp', value: 'timestamp' },
    { text: 'Changed Information', value: 'changeInfo' }
  ]

  bodys: Array<Object> = [
    {
      stt: 1,
      admin: 'linh',
      action: 'xoa user',
      timestamp: 2442423423423,
      changeinfo: 'fsdf'
    },
    {
      stt: 2,
      admin: 'huy',
      action: 'them user',
      timestamp: 25543423423423,
      changeinfo: 'fsdf'
    },
    {
      stt: 3,
      admin: 'huy',
      action: 'sua user',
      timestamp: 5354323423423,
      changeinfo: 'fsdf'
    },
    {
      stt: 4,
      admin: 'linh',
      action: 'xoa user',
      timestamp: 2442423423423,
      changeinfo: 'fsdf'
    }
  ]
}
</script>
