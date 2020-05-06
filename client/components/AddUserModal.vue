<template>
  <v-row justify="end" class="mr-1">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add User</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="5" md="5">
                <v-row>
                  <v-text-field v-model="username" label="Username"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="rePassword" label="Re-Password" type="password"></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="5" md="5">
                <!-- <v-row>
                  <Datepicker @change-dob="changeDateOfBirth" />
                </v-row>
                <v-row>
                  <v-radio-group v-model="radios" row>
                    <v-radio label="Male" value="male"></v-radio>
                    <v-radio label="Female" value="female"></v-radio>
                  </v-radio-group>
                </v-row>-->
                <v-row>
                  <label>Roles</label>
                  <MultiCombobox />
                </v-row>
                <v-row>
                  <label>Positions</label>
                  <MultiCombobox />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Datepicker from '@/components/Datepicker.vue'
import MultiCombobox from '@/components/MultiCombobox.vue'

@Component({
  components: {
    Datepicker,
    MultiCombobox
  }
})
export default class Breadcumd extends Vue {
  dialog: boolean = false
  username: string = ''
  password: string = ''
  rePassword: string = ''
}
</script>
