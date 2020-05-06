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
      text: 'Leave Request',
      disabled: false,
      href: 'leave-request'
    }
  ]
  // headers: Array<Object> = []
  // bodys: Array<Object> = []

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Absent day', value: 'absent' },
    { text: 'Hours', value: 'hours' }
  ]

  bodys: Array<Object> = [
    {
      stt: 1,
      absent: '04/05/2020',
      hours: 34
    },
    {
      stt: 2,
      absent: '05/05/2020',
      hours: 23
    },
    {
      stt: 3,
      absent: '06/05/2020',
      hours: 3
    },
    {
      stt: 4,
      absent: '07/05/2020',
      hours: 5
    },
    {
      stt: 5,
      absent: '07/05/2020',
      hours: 6
    }
  ]
}
</script>
