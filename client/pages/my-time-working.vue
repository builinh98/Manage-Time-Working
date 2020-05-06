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
  // headers: Array<Object> = []
  // bodys: Array<Object> = []
  items: Array<Object> = [
    {
      text: 'My Time Working',
      disabled: false,
      href: 'my-time-working'
    }
  ]

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Date', value: 'date' },
    { text: 'Check-in', value: 'checkins' },
    { text: 'Checkout', value: 'checkouts' }
  ]

  bodys: Array<Object> = [
    {
      stt: 1,
      date: '04/05/2020',
      checkins: 6.0,
      checkouts: 24
    },
    {
      stt: 2,
      date: '05/05/2020',
      checkins: 6.0,
      checkouts: 24
    },
    {
      stt: 3,
      date: '06/05/2020',
      checkins: 6.0,
      checkouts: 24
    },
    {
      stt: 4,
      date: '07/05/2020',
      checkins: 6.0,
      checkouts: 24
    },
    {
      stt: 5,
      date: '07/05/2020',
      checkins: 6.0,
      checkouts: 24
    }
  ]
}
</script>
