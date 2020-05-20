<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb :items="items" />
    </v-row>
    <v-row align="center" justify="center" class="fill-height no-gutters mt-n7">
      <v-col cols="12">
        <v-row class="no-gutters">
          <!-- <Toolbar /> -->
          <v-btn @click="checkin">Check-in</v-btn>
          <v-btn @click="checkout">Check-out</v-btn>
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
  date: string
  checkin: string
  checkout: string
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
export default class MyTimeWorking extends Vue {
  site: string = 'mytime'
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

  data: Array<Object> = []

  async checkin() {
    const timestamp = new Date()
    const checkin = await $axios.post(`times/checkins`, { timestamp })
    console.log(checkin)
    this.getData()
  }

  async checkout() {
    const timestamp = new Date()
    const checkout = await $axios.post(`times/checkouts`, { timestamp })
    this.getData()
  }
  
  getCheckins() {
    return $axios.get(`times/checkins`)
  }

  getCheckouts() {
    return $axios.get(`times/checkouts`)
  }
  async getData() {
    const resCheckins = await this.getCheckins()
    const resCheckouts = await this.getCheckouts()
    this.data = resCheckins.data.map((checkin, index) => {
      const checkouts = resCheckouts.data.filter(checkout => {
        return checkout.checkin && checkout.checkin.id === checkin.id
      })
     
      const date = moment(checkin.timestamp).format('DD/MM/YYYY')
      const timeCheckin = moment(checkin.timestamp).format('hh:mm:ss')
      const timeCheckout = checkouts.length === 1 
      ? moment(checkouts[0].timestamp).format('hh:mm:ss') : ''
      const displayData: DisplayData = {
        stt: index + 1,
        date: date,
        checkin: timeCheckin,
        checkout: timeCheckout
      }
      return displayData
    })
  }

  created() {
    $axios.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg5MzM0OTEzLCJleHAiOjE1ODk2OTQ5MTN9.ew9IaIcd_3joFFNrz3PGhV4o0eL0GlwM_1PJCBWWsEQ',
      'Bearer'
    )
    this.getData()
  }
}
</script>
