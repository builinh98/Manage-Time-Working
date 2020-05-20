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
  absent: string
  hours: string
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
export default class LeaveRequest extends Vue {
  site: string = 'leaverequest'
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

  data: Array<Object> = []

  async created() {
    const { data } = await $axios.get(`leaves/absences?month=5&year=2020`)
    this.data = data.absences.map((absence, index) => {
      const displayData: DisplayData = {
        stt: index + 1,
        absent: absence.date,
        hours: absence.hours
      }
      return displayData
    })
  }
}
</script>
