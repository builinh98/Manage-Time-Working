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
            <Table :headers="headers" :bodys="data" :site="site"/>
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
  }
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
    $axios.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg4NTkyODM3LCJleHAiOjE1ODg5NTI4Mzd9.wOipnKndHxv7HHG6Q040i1h-9KBJcY_MxNLOFHmIFlQ',
      'Bearer'
    )
    const {data} = await $axios.get(`checkins`)
    // this.data = data.map((action, index) => {
    //   const displayData: DisplayData = {
    //     stt: index + 1,
    //     admin: action.user_id,
    //     action: action.action,
    //     timestamp: moment(action.timestamp).format('DD/MM/YYYY hh:mm:ss'),
    //     changeInfo: action.changeInfo
    //   }
    //   return displayData
    // })
  }
}
</script>
