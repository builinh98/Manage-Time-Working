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
            <Table :headers="headers" :bodys="data" :site="site" />
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
import moment from 'moment'
import { $axios } from '../utils/api'

interface DisplayData {
  stt: number
  username: string
  workings: string
  leaves: string
  absence: string
}

@Component({
  components: {
    Breadcumb,
    Toolbar,
    Pagination,
    Table
  },
  middleware: ['auth']
})
export default class Dashboard extends Vue {
  site: string = 'dashboard'
  items: Array<Object> = [
    {
      text: 'Dashboard',
      disabled: false,
      href: '/'
    }
  ]
  // headers: Array<Object> = []
  // bodys: Array<Object> = []

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Username', value: 'username' },
    { text: 'Working hours', value: 'working' },
    { text: 'Leave hours', value: 'leave' },
    { text: 'Absent days', value: 'absent' },
    { text: 'Export', value: 'export' }
  ]

  data: Array<Object> = [
    {
      stt: 1,
      username: 'linhbq.intern@gmail.com',
      working: 100,
      leave: 10,
      absent: 3,
      export: 'export'
    },
    {
      stt: 2,
      username: 'huybq.intern@gmail.com',
      working: 200,
      leave: 100,
      absent: 10,
      export: 'export'
    }
  ]

    
  getWorkings() {
    return $axios.get(`times/workings?month=5`)
  }

  getLeaves() {
    return $axios.get(`leaves/absences?month=5&year=2020`)
  }
  async getData() {
    const resWorkings = await this.getWorkings()
    const resLeaves = await this.getLeaves()
    this.data = resWorkings.data.map((checkin, index) => {
      const displayData: DisplayData = {
        stt: index + 1,
        username: '',
        workings: '',
        leaves: '',
        absence: ''
      }
      return displayData
    })
  }

  created() {
    // this.getData()
  }
}
</script>
