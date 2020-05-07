<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb :items="items" />
    </v-row>
    <v-row align="center" justify="center" class="fill-height no-gutters mt-n7">
      <v-col cols="12">
        <v-row class="no-gutters">
          <!-- <Toolbar /> -->
          <AddUserModal />
        </v-row>
        <v-row>
          <v-col cols="12">
            <Table
              :headers="headers"
              :bodys="data"
              :site="site"
              @edit-data = "editData"
              @delete-data = "deleteData"
            />
            <br />
            <Pagination @page-change="pageChange" />
          </v-col>
          <ConfirmModal :confirmDialog="confirmDialog" @close-modal="closeConfirmModal" />
          <EditUserModal :editDialog="editDialog" @close-modal="closeEditModal"/>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Breadcumb from '@/components/Breadcumb.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import Table from '@/components/Table.vue'
import AddUserModal from '@/components/AddUserModal.vue'
import EditUserModal from '@/components/EditUserModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import moment from 'moment'
import { $axios } from '../utils/api'

interface DisplayData {
  stt: number
  username: string
  fullname: string
  roles: string
  positions: string
  gender: string
  dob: string
  edit: string
  delete: string
}

@Component({
  components: {
    Breadcumb,
    Toolbar,
    Pagination,
    Table,
    AddUserModal,
    ConfirmModal,
    EditUserModal
  }
})
export default class Users extends Vue {
  page: number = 1
  site: string = 'users'
  confirmDialog: boolean = false
  editDialog: boolean = false
  items: Array<Object> = [
    {
      text: 'Users',
      disabled: false,
      href: 'users'
    }
  ]
  // headers: Array<Object> = []
  // bodys: Array<Object> = []

  headers: Array<Object> = [
    { text: 'STT', value: 'stt' },
    { text: 'Username', value: 'username' },
    { text: 'Full Name', value: 'fullname' },
    { text: 'Roles', value: 'roles' },
    { text: 'Positions', value: 'positions' },
    { text: 'Dob', value: 'dob' },
    { text: 'Gender', value: 'gender' },
    { text: 'Edit', value: 'edit' },
    { text: 'Delete', value: 'delete' }
  ]

  data: Array<Object> = []

  pageChange(page: number) {
    this.page = page
  }

  deleteData(site: string) {
    if(site === this.site) this.confirmDialog = !this.confirmDialog
    console.log("linh")
  }

  editData(site: string) {
    if(site === this.site ) this.editDialog = !this.editDialog
  }

  closeConfirmModal(){
    this.confirmDialog = !this.confirmDialog
  }

  closeEditModal(){
    this.editDialog = !this.editDialog
  }

  async getData() {
    $axios.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg4NTkyODM3LCJleHAiOjE1ODg5NTI4Mzd9.wOipnKndHxv7HHG6Q040i1h-9KBJcY_MxNLOFHmIFlQ',
      'Bearer'
    )
    const { data } = await $axios.get(`users?page=${this.page}`)
    this.data = data.map((user, index) => {
      const roles = user.roles.map((role) => role.name).join(', ')
      const positions = user.positions
        .map((position) => position.name)
        .join(', ')
      const displayData: DisplayData = {
        stt: index + 1,
        username: user.username,
        fullname: `${user.firstname} ${user.lastname}`,
        roles: roles,
        positions: positions,
        dob: moment(user.dob).format('DD/MM/YYYY'),
        gender: user.gender === 1 ? 'Male' : 'Female',
        edit: 'edit',
        delete: 'delete'
      }
      return displayData
    })
  }

  created() {
    this.getData()
  }
}
</script>

