<template>
  <v-simple-table height="340">
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bodys" :key="index">
          <td v-for="(val, key) in item" :key="key">
            <v-icon v-if="val === 'edit'" size="30" @click="editUser"
              >mdi-table-edit</v-icon
            >
            <v-icon v-else-if="val === 'delete'" size="30" @click="deleteUser"
              >mdi-delete</v-icon
            >
            <span v-else>{{ val }}</span>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class Breadcumd extends Vue {
  @Prop({ required: true }) readonly headers!: Array<object>
  @Prop({ required: true }) readonly bodys!: Array<object>

  editUser() {
    alert('edit user')
  }

  @Emit('delete-confirm')
  deleteUser(dialog: boolean) {
    console.log(dialog)
  }
}
</script>
