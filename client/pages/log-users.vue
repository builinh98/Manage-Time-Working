<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb :items="items" />
    </v-row>
    <v-row align="center" justify="center" class="fill-height no-gutters mt-n7">
      <v-col cols="12">
        <v-row class="no-gutters">
          <!-- <Toolbar /> -->
          <AddLogUsersModal />
        </v-row>
        <v-row>
          <v-col cols="12">
            <Table
              :headers="headers"
              :bodys="data"
              :site="site"
              @edit-data="editData"
              @delete-data="deleteData"
            />
            <br />
            <Pagination />
          </v-col>
          <ConfirmModal :confirmDialog="confirmDialog" @close-modal="closeConfirmModal" />
          <EditLogUsersModal :editDialog="editDialog" @close-modal="closeEditModal" />
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
import AddLogUsersModal from '@/components/AddLogUsersModal.vue'
import EditLogUsersModal from '@/components/EditLogUsersModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import moment from 'moment'
import { $axios } from '../utils/api'

interface DisplayData {
  stt: number
  username: string
  date: string
  checkin: string
  checkout: string
  edit: string
  delete: string
}

@Component({
  components: {
    Breadcumb,
    Toolbar,
    Pagination,
    Table,
    AddLogUsersModal,
    EditLogUsersModal,
    ConfirmModal
  }
})
export default class LogUser extends Vue {
  site: string = 'loguser'
  confirmDialog: boolean = false
  editDialog: boolean = false
  items: Array<Object> = [
    {
      text: 'Log Users',
      disabled: false,
      href: 'log-users'
    }
  ]
  // headers: Array<Object> = []
  // bodys: Array<Object> = []

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Username', value: 'username' },
    { text: 'Date', value: 'date' },
    { text: 'Check-in', value: 'checkins' },
    { text: 'Checkout', value: 'checkouts' },
    { text: 'Edit', value: 'edit' },
    { text: 'Delete', value: 'delete' }
  ]

  data: Array<Object> = []

  deleteData(site: string) {
    if (site === this.site) this.confirmDialog = !this.confirmDialog
    console.log('huy')
  }

  editData(site: string) {
    if (site === this.site) this.editDialog = !this.editDialog
  }
  closeConfirmModal() {
    this.confirmDialog = !this.confirmDialog
  }

  closeEditModal() {
    this.editDialog = !this.editDialog
  }

  public mergeByDate(checkins, checkouts): Array<any> {
    let data = checkins.map((checkin) => ({
      ...checkin,
      ...checkouts.find(
        (checkout) =>
          checkout.date === checkin.date &&
          checkout.author.id === checkin.author.id &&
          checkout
      )
    }))
    return data
  }

  async created() {
    $axios.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg5MzM0OTEzLCJleHAiOjE1ODk2OTQ5MTN9.ew9IaIcd_3joFFNrz3PGhV4o0eL0GlwM_1PJCBWWsEQ',
      'Bearer'
    )
    const resCheckins = await $axios.get(`times/checkins`)
    const resCheckouts = await $axios.get(`times/checkouts`)
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
    this.data = this.mergeByDate(checkins, checkouts).map((dt, index) => {
      const displayData: DisplayData = {
        stt: index + 1,
        username: dt.author.username,
        date: dt.date,
        checkin: dt.checkin,
        checkout: dt.checkout,
        edit: 'edit',
        delete: 'delete'
      }
      return displayData
    })
  }
}
</script>
