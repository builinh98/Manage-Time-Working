<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb :items="items" />
    </v-row>
    <v-row align="center" justify="center" class="fill-height no-gutters mt-n7">
      <v-col cols="12">
        <v-row class="no-gutters">
          <!-- <Toolbar /> -->
          <v-btn>Check-in</v-btn>
          <v-btn>Check-out</v-btn>
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
  }
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

  public mergeByDate(checkins, checkouts): Array<any> {
    let data = checkins.map((checkin) => ({
      ...checkin,
      ...checkouts.find(
        (checkout) => checkout.date === checkin.date && checkout
      )
    }))
    return data
  }

  async created() {
    $axios.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg4NTkyODM3LCJleHAiOjE1ODg5NTI4Mzd9.wOipnKndHxv7HHG6Q040i1h-9KBJcY_MxNLOFHmIFlQ',
      'Bearer'
    )
    const resCheckins = await $axios.get(`checkins`)
    const resCheckouts = await $axios.get(`checkouts`)
    const checkins = resCheckins.data.map((checkin) => {
      checkin.date = moment(checkin.timestamp).format('DD/MM/YYYY')
      checkin.checkin = moment(checkin.timestamp).format('hh:mm:ss')
      return checkin
    })
    const checkouts = resCheckouts.data.map((checkout) => {
      checkout.date = moment(checkout.timestamp).format('DD/MM/YYYY')
      checkout.checkout = moment(checkout.timestamp).format('hh:mm:ss')
      return checkout
    })
    console.log(checkins)
    this.data = this.mergeByDate(checkins, checkouts).map((dt, index) => {
      const displayData: DisplayData = {
        stt: index + 1,
        date: dt.date,
        checkin: dt.checkin,
        checkout: dt.checkout
      }
      return displayData
    })
  }
}
</script>
