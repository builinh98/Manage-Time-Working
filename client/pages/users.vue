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
              :bodys="bodys"
              @delete-confirm="deleteConfirm"
            />
            <br />
            <Pagination />
          </v-col>
          <ConfirmModal :dialog="dialog" />
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
import AddUserModal from '@/components/AddUserModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

@Component({
  components: {
    Breadcumb,
    Toolbar,
    Pagination,
    Table,
    AddUserModal,
    ConfirmModal
  }
})
export default class Profile extends Vue {
  dialog: boolean = false
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

  bodys: Array<Object> = [
    {
      stt: 1,
      username: 'linhbq.intern@gmail.com',
      fullname: 'Bùi Quang Linh',
      roles: 24,
      positions: 'dev, test',
      dob: '04/05/2020',
      gender: 'Nam',
      edit: 'edit',
      delete: 'delete'
    },
    {
      stt: 2,
      username: 'huybq.intern@gmail.com',
      fullname: 'Bùi Quang Huy',
      roles: 24,
      positions: 'dev',
      dob: '04/05/2020',
      gender: 'Nam',
      edit: 'edit',
      delete: 'delete'
    }
  ]

  deleteConfirm(dialog: boolean): void {
    this.dialog = dialog
  }
}
</script>
